// 文件上传
const multer = require('koa-multer');
// 配置 磁盘存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/user_avatar/')
    },
    // 修改文件名
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split('.');
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
})
// 加载配置
const upload = multer({
    storage: storage
})
module.exports = upload
