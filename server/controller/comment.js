const {
    commentValidator
} = require('../validator/comment')
const CommentModel = require('../models/CommentModel');
const AriticalModel = require('../models/ArticleModel');
const ReplyModel = require('../models/ReplyModel');
const UserModel = require('../models/UserModel');
const { Resolve } = require('../lib/helper');
const res = new Resolve();
class CommentController {
    static async createComment(ctx, next) {
        commentValidator(ctx);
        const { target_id } = ctx.request.body;
        const hasArticle = await AriticalModel.findById({ _id: target_id });
        if (!hasArticle) {
            throw new global.errs.NotFound('评论的文章不存在');
        }
        const comment = await CommentModel.create(ctx.request.body);
        ctx.status = 200;
        ctx.body = res.json(comment);
    }
    static async getCommentList(ctx, next) {
        let { currentPage = 1, pageSize = 4 } = ctx.query;
        currentPage = parseInt(currentPage);
        pageSize = parseInt(pageSize);
        const total = await CommentModel.find().countDocuments();
        const CommentList = await CommentModel.find()
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 })//倒序
        ctx.status = 200;
        const data = {
            CommentList,
            currentPage,
            pageSize,
            total,
        }
        ctx.body = res.json(data);
    }
    static async getCommentDetailById(ctx, next) {
        const { _id } = ctx.params;
        const hasComment = await CommentModel.findById({ _id });
        if (!hasComment) {
            throw new global.errs.NotFound('找不到该评论')
        }
        //----- 获取该评论的回复列表-----
        let ReplyList = await ReplyModel.find({ comment_id: _id }).sort({ _id: -1 }).lean()
        let data = {
            hasComment,
            ReplyList
        }
        ctx.status = 200;
        ctx.body = res.json(data)
    }
    static async updateCommentById(ctx, next) {
        const { _id } = ctx.params;
        let commentUpdate = await CommentModel.findByIdAndUpdate({ _id }, ctx.request.body);
        if (!commentUpdate) {
            throw new global.errs.NotFound('找不到需要更新的评论')
        }
        ctx.status = 200;
        ctx.body = res.success('评论更新成功');
    }
    static async deleteCommentById(ctx, next) {
        const { _id } = ctx.params;
        let commentDelete = await CommentModel.findByIdAndDelete({ _id });
        if (!commentDelete) {
            throw new global.errs.NotFound('找不到需要删除的评论')
        }
        ctx.status = 200;
        ctx.body = res.success('评论删除成功');
    }
    // 获取目标评论
    static async targetComment(params = {}) {
        const { target_id, currentPage = 1 } = params;
        const pageSize = 4;
        const total = await CommentModel.find({ target_id }).countDocuments();
        let commentList = await CommentModel.find({ target_id })
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 })//倒序
            .lean()
        await Promise.all(commentList.map(async comment => {
            let { cover } = await UserModel.findOne({ nickname: comment.nickname })
            // 评论者的头像
            comment.cover = cover;
            let ReplyList = await ReplyModel.find({ comment_id: comment._id }).lean()
            await Promise.all(ReplyList.map(async reply => {
                let { cover } = await UserModel.findOne({ nickname: reply.nickname })
                // 回复者的头像
                reply.cover = cover
            }))
            comment.ReplyList = ReplyList
        }))
        return {
            commentList,
            currentPage: parseInt(currentPage),
            pageSize: parseInt(pageSize),
            total: total,
            total_pages: Math.ceil(total / pageSize),
        }
    }
    static async getTargetComments(ctx, next) {
        const commentList = await CommentController.targetComment(ctx.query)
        ctx.status = 200;
        ctx.body = res.json(commentList);
    }
}
module.exports = CommentController;