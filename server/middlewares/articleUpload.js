// 文件上传
const multer = require('koa-multer');
// 配置 磁盘存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/article_cover/')
    },
    // 修改文件名
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split('.');//以点分割
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
})
// 加载配置
const upload = multer({
    storage: storage
})
module.exports = upload
