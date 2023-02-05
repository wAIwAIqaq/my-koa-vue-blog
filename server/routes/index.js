const Router = require('koa-router');
const router = new Router;
const ArticleModel = require('../models/ArticleModel');
const AdvertiseModel = require('../models/AdvertiseModel');
const CategoryModel = require('../models/CategoryModel');
const CommentModel = require('../models/CommentModel');
const Replymodel = require('../models/ReplyModel');
router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'wAIwAI的博客'
  };
  //获取参数
  // 分类 分页码 分页数 关键字
  let { category_id = null, currentPage = 1, pageSize = 4, keywords } = ctx.query
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
  const total = await ArticleModel.find().countDocuments()
  // 分页查询
  const article = await ArticleModel.find()
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
    .populate('category_id').lean()//连表查询
  // 获取广告
  const advertise = await AdvertiseModel.find().lean();
  const category = await CategoryModel.find().lean();
  const data = {
    title: ctx.state.title,
    article,
    currentPage,
    pageSize,
    total,
    advertise,
    category
  }
  await ctx.render('index', data);
})
// 关于页面
router.get('/about', async ctx => {
  ctx.status = 200;
  ctx.response.set('Content_Type', 'text/html charset=utf-8')
  await ctx.render('about');
})
// 文章详情
router.get('/article/detail/:id', async ctx => {
  // 获取文章详情
  const _id = ctx.params.id;
  const ArticleDetail = await ArticleModel.findOne({ _id }).populate('category_id');
  // 更新文章浏览数
  if (!ArticleDetail) {
    throw new global.errs.NotFound('没有找到相关文章');
  }
  await ArticleModel.findByIdAndUpdate({ _id }, { browse: ++ArticleDetail.browse })
  // 获取文章下的评论列表 先将mongoose的query对象转换成js的可操作的数组对象
  let CommentList = await CommentModel.find({ target_id: _id }).sort({ _id: -1 }).lean()

  // 获取评论下的回复列表 
  let NewCommentList = await Promise.all(CommentList.map(async comment => {
    let replyList = await Replymodel.find({ comment_id: comment._id }).lean()
    comment.replyList = replyList;
    return comment;
  }))
  let data = {
    article: ArticleDetail,
    commentList: NewCommentList,
  }
  await ctx.render('article-detail', data);
})
module.exports = router;
