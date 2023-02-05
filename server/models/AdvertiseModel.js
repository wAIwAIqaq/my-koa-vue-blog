// 广告模型
const mongoose = require('mongoose');
const moment = require('moment');
const advertiseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },//广告标题
    link: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now,
        // 处理时间
        get(val) {
            return moment(val).format('YYYY-MM-DD');
        }
    },
})
advertiseSchema.set('toJSON', {
    getters: true,
})
const AdvertiseModel = mongoose.model('Advertise', advertiseSchema);
// 向外暴露广告模型
module.exports = AdvertiseModel;