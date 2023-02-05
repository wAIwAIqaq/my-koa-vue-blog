// 回复模型
const mongoose = require('mongoose');
const moment = require('moment');
// 定义Scheme
const replySchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },//回复者昵称
    content: {
        type: String,
        required: true,
    },//回复的内容
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        get(val) {
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        }
    },//创建时间
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }//回复对象的id
})
// 只有将Schema设置如下配置，才能调用get方法
replySchema.set('toJSON', {
    getters: true,
});
//定义model
const Replymodel = mongoose.model('Reply', replySchema);
// 向外暴露model
module.exports = Replymodel;