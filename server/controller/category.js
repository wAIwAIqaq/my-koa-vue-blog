const {
    categoryValidator
} = require('../validator/category')
const CategoryModel = require('../models/CategoryModel');
const { Resolve } = require('../lib/helper');
const res = new Resolve();
class CategoryController {
    static async createCategory(ctx, next) {
        // 参数校验
        categoryValidator(ctx)
        const { name, keywords='' } = ctx.request.body;
        const hasCategory = await CategoryModel.findOne({ name });
        if (hasCategory) {
            throw new global.errs.Existing('分类已存在');
        }
        const category = await CategoryModel.create({ name, keywords })
        ctx.status = 200;
        ctx.body = res.json(category)
    }
    static async getCategoryList(ctx, next) {
        const categoryList = await CategoryModel.find();
        ctx.status = 200;
        ctx.body = res.json(categoryList)
    }
    // 更改分类
    static async updateCategoryById(ctx, next) {
        // 参数验证,保证name和keywords都有值
        categoryValidator(ctx)
        const _id = ctx.params._id;
        const { name, keywords } = ctx.request.body;
        //category 表示将要更新的数据
        const category = await CategoryModel.findByIdAndUpdate({ _id }, { name, keywords });
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类');
        }
        ctx.body = res.success(`${category.name}已经修改为${name},关键字${category.keywords}已经修改为${keywords}`)
    }
    // 获取分类详情 
    static async getCategoryDetailById(ctx, next) {
        const _id = ctx.params._id;
        const categoryDetail = await CategoryModel.findById({ _id });
        if (!categoryDetail) {
            throw new global.errs.NotFound('没有找到该分类详情');
        }
        ctx.body = res.json(categoryDetail);
    }
    // 删除分类
    static async deleteCategoryById(ctx, next) {
        const _id = ctx.params._id;
        const categoryDelete = await CategoryModel.findByIdAndDelete({ _id });
        if (!categoryDelete) {
            throw new global.errs.NotFound('没有找到想要删除的分类')
        }
        ctx.body = res.success(`${categoryDelete.name}分类删除成功`)
    }
}
module.exports = CategoryController;