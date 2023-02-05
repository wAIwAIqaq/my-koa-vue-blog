// 评论模型的创建
const mongoose = require('mongoose');
const moment = require('moment');
// 定义Schema
const commentSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },//评论人的昵称
    content: {
        type: String,
        required: true,
    },//评论内容
    target_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    },//评论目标文章的id
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        get(val) {
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        }
    },//评论时间
})
commentSchema.set('toJSON', {
    getters: true,
});
// 创建模型
const CommentModel = mongoose.model('Comment', commentSchema);
// 暴露评论模块
module.exports = CommentModel;