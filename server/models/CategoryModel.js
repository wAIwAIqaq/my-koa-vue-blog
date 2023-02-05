// 分类模型的创建
const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    keywords: {
        type: String,
        required: false,
    }
})
const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = CategoryModel;