const ArticleModel = require('../models/ArticleModel');
// const CommentModel = require('../models/CommentModel');
const Comment = require('./comment');
const CategoryModel = require('../models/CategoryModel');
const ReplyModel = require('../models/ReplyModel');
const UserModel = require('../models/UserModel');
const { createArticleValidator } = require('../validator/article')
const { Resolve } = require('../lib/helper');
const res = new Resolve();
class ArticleController {
    // 创建文章
    static async createArticle(ctx, next) {
        const category_id = ctx?.request?.body?.category_id ?? null;
        let { _id } = await CategoryModel.findOne({ name: category_id }).lean()
        _id = _id.toString();//根据分类名查找出分类的_id转字符串
        ctx.request.body.category_id = _id;
        createArticleValidator(ctx);
        const { title } = ctx.request.body;
        const hasArticle = await ArticleModel.findOne({ title })
        if (hasArticle) {
            throw new global.errs.Existing('文章标题重复');
        }
        console.log(ctx.request.body);
        const article = await ArticleModel.create(ctx.request.body)
        ctx.status = 200;
        ctx.body = res.json(article)
    }
    // 获取文章列表
    static async getArticleList(ctx, next) {
        // 分类 分页码 分页数 关键字
        let { category_id = null, currentPage = 1, pageSize = 4, keywords = '' } = ctx.query
        // 是否存在分类id
        let filter = {};
        if (category_id) {
            const hasCategory_id = await ArticleModel.findOne({ category_id });
            if (!hasCategory_id) {
                throw new global.errs.NotFound('该文章分类不存在')
            }
            filter.category_id = category_id;
        }
        currentPage = parseInt(currentPage);
        pageSize = parseInt(pageSize);
        const total = await ArticleModel.find().where(filter).or([
            {
                keywords: {
                    $regex: new RegExp(keywords, 'i')//模糊查询
                }
            }
        ]
        ).countDocuments()
        const articleList = await ArticleModel.find()
            .where(filter)
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize)
            .or([
                {
                    keywords: {
                        $regex: new RegExp(keywords, 'i')//模糊查询
                    }
                }
            ]
            )
            .sort({ _id: -1 })//倒序
            .populate('category_id')//连表查询
        const data = {
            articleList,
            currentPage,
            pageSize,
            total
        }
        ctx.status = 200;
        ctx.body = res.json(data);
    }
    // 更新文章
    static async updateArticle(ctx, next) {
        const _id = ctx.params._id;
        let hasArticle = await ArticleModel.findByIdAndUpdate({ _id }, ctx.request.body);
        if (!hasArticle) {
            throw new global.errs.NotFound('找不到需要更新的文章');
        }
        ctx.status = 200;
        ctx.body = res.success('文章更新成功')
    }
    // 获取文章详情
    static async getArticleDetailById(ctx, next) {
        const _id = ctx.params._id;
        const ArticleDetail = await ArticleModel.findOne({ _id }).populate('category_id');
        // 更新文章浏览数
        if (!ArticleDetail) {
            throw new global.errs.NotFound('没有找到相关文章');
        }
        await ArticleModel.findByIdAndUpdate({ _id }, { browse: ++ArticleDetail.browse })
        // 获取文章下的评论列表 先将mongoose的query对象转换成js的可操作的数组对象
        // let CommentList = await CommentModel.find({ target_id: _id }).sort({ _id: -1 }).lean()
        let comment = await Comment.targetComment({ target_id: ArticleDetail._id })
        // 获取评论下的回复列表 
        let NewCommentList = await Promise.all(comment.commentList.map(async comment => {
            let ReplyList = await ReplyModel.find({ comment_id: comment._id }).lean()
            await Promise.all(ReplyList.map(async reply => {
                const { cover } = await UserModel.findOne({ nickname: reply.nickname })
                reply.cover = cover;
            }))
            comment.ReplyList = ReplyList;
            return comment;
        }))
        ctx.status = 200;
        let data = {
            ArticleDetail,
            CommentList: NewCommentList,
            comment_currentPage: comment.currentPage,
            comment_pageSize: comment.pageSize,
            comment_total: comment.total,
            comment_total_pages: comment.total_pages,
        }
        ctx.body = res.json(data)
    }
    // 删除文章
    static async deleteArticleById(ctx, next) {
        const _id = ctx.params._id;
        const deleteArticle = await ArticleModel.findByIdAndDelete({ _id });
        if (!deleteArticle) {
            throw new global.errs.NotFound('找不到需要删除的文章')
        }
        ctx.status = 200;
        ctx.body = res.success(`文章《${deleteArticle.title}》已经被删除`)
    }
    // 图片上传的操作
    static async uploadCoverImg(ctx, next) {
        const imgDestination = ctx.req.file.destination;
        const imgName = ctx.req.file.filename;
        const imgUrl = `${imgDestination.slice(14, 28)}${imgName}`
        ctx.body = res.json(imgUrl)
    }
}
module.exports = ArticleController