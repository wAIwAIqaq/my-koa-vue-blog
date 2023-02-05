const AdvertiseModel = require('../models/AdvertiseModel');
const { createAdvertiseValidator } = require('../validator/advertise')
const { Resolve } = require('../lib/helper');
const res = new Resolve();
class AdvertiseContorller {
    static async createAdvertise(ctx, next) {
        createAdvertiseValidator(ctx)
        const advertise = await AdvertiseModel.create(ctx.request.body);
        if (!advertise) {
            throw new global.errs.Exsiting('你所创建的广告已存在')
        }
        ctx.status = 200;
        ctx.body = res.json(advertise)
    }
    static async getAdvertiseList(ctx, next) {
        const advertiseList = await AdvertiseModel.find();
        ctx.status = 200;
        ctx.body = res.json(advertiseList);
    }
    static async getAdvertiseDetailById(ctx, next) {
        const { _id } = ctx.params
        const hasAdvertiseDetail = await AdvertiseModel.findById({ _id });
        if (!hasAdvertiseDetail) {
            throw new global.errs.NotFound('该广告不存在')
        }
        ctx.status = 200;
        const data = {
            hasAdvertiseDetail,
            _id,
        }
        ctx.body = res.json(data)
    }
    static async updateAdvertiseById(ctx, next) {
        const { _id } = ctx.params
        const updateAdvertise = await AdvertiseModel.findByIdAndUpdate({ _id }, ctx.request.body);
        if (!updateAdvertise) {
            throw new global.errs.NotFound('需要更新的广告不存在')
        }
        ctx.status = 200;
        ctx.body = res.success(`${updateAdvertise.title}标题已变成${ctx.request.body.title},链接${updateAdvertise.link}已变成${ctx.request.body.link}`)
    }
    static async deleteAdvertiseById(ctx, next) {
        const { _id } = ctx.params;
        const hasDeleteAdevertise = await AdvertiseModel.findByIdAndDelete({ _id });
        if (!hasDeleteAdevertise) {
            throw new global.errs.NotFound('需要删除的广告不存在')
        }
        ctx.status = 200;
        ctx.body = res.success(`${hasDeleteAdevertise.title}广告已被删除`)
    }
}
module.exports = AdvertiseContorller