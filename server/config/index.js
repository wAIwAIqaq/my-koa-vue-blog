module.exports = {
  port: 5000,
  db: {
    port: 27017,//数据库端口号
    host: '127.0.0.1',//数据库本地地址
    dbName: 'myBlog'//数据库名字
  },
  // 签证配置
  security: {
    secretKey: 'secretKey',
    // 过期时间
    exp: Math.floor(Date.now() / 1000) + (60 * 60) * 24,//认证有效期为24h
  }
}
