const {
    replyValidator
} = require('../validator/reply')
const ReplyModel = require('../models/ReplyModel');
const CommentModel = require('../models/CommentModel');
const UserModel = require('../models/UserModel');
const { Resolve } = require('../lib/helper');
const res = new Resolve();
class ReplyController {
    static async createReply(ctx, next) {
        replyValidator(ctx);
        const { comment_id } = ctx.request.body;
        const hasComment = await CommentModel.findById({ _id: comment_id });
        if (!hasComment) {
            throw new global.errs.NotFound('回复的评论不存在');
        }
        const reply = await ReplyModel.create(ctx.request.body);
        ctx.status = 200;
        ctx.body = res.json(reply);
    }
    // 获取该评论下的回复列表
    static async getReplyListByCommentId(ctx, next) {
        const { comment_id } = ctx.query;
        const hasComment = await CommentModel.findById({ _id: comment_id });
        if (!hasComment) {
            throw new global.errs.NotFound('该评论不存在');
        }
        const replyList = await ReplyModel.find({ comment_id }).sort({ _id: -1 })
        if (!replyList) {
            throw new global.errs.NotFound('该评论没有回复');
        }
        ctx.status = 200;
        const data = {
            comment_id,
            replyList,
        }
        ctx.body = res.json(data);
    }
    // 根据Id获取回复的详情
    static async getReplyDetailById(ctx, next) {
        const { _id } = ctx.params;
        console.log(_id);
        const hasReply = await ReplyModel.findById({ _id });
        if (!hasReply) {
            throw new global.errs.NotFound('该回复不存在');
        }
        ctx.status = 200;
        ctx.body = res.json(hasReply);
    }
    static async updateReplyById(ctx, next) {
        const { _id } = ctx.params;
        const hasReply = await ReplyModel.findByIdAndUpdate({ _id }, ctx.request.body);
        if (!hasReply) {
            throw new global.errs.NotFound('找不到需要更新的回复');
        }
        ctx.status = 200;
        ctx.body = res.success('回复更新成功');
    }
    static async deleteReplyById(ctx, next) {
        const { _id } = ctx.params;
        const hasReply = await ReplyModel.findByIdAndDelete({ _id });
        if (!hasReply) {
            throw new global.errs.NotFound('找不到需要删除的回复');
        }
        ctx.status = 200;
        ctx.body = res.success('回复删除成功');
    }
}
module.exports = ReplyController;