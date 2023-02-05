// 文章模型的创建
const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },//文章标题
    author: {
        type: String,
        required: true,
    },//文章作者
    description: {
        type: String,
        required: false,
    },//文章简介
    keywords: {
        type: String,
        required: true,
    },//文章关键字
    content: {
        type: String,
        required: true,
    },//文章内容
    cover: {
        type: String,
        required: false,
    },//文章封面
    browse: {
        type: Number,
        default: 0,
    },//文章浏览数
    // 一个分类下有多篇文章，属于一对多关系
    // 分类表:主表 文章表:从表
    // 关联分类
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        //ref属性表示引用可以直接引用Category模型
        ref: 'Category'
    },
}, {//为表添加创建时间，更新时间
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})
// 定义文章模型
const ArticleModel = mongoose.model('Article', articleSchema);
// 暴露文章模型
module.exports = ArticleModel;