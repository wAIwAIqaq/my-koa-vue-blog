const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const config = require('./config')
const index = require('./routes')
const hbs = require('koa-hbs');
// 全局错误处理
const error = require('./core/http-exception');
global.errs = error;
global.config = config;
// 路由模块
const admin = require('./routes/admin');
const category = require('./routes/category');
const article = require('./routes/article')
const comment = require('./routes/comment')
const reply = require('./routes/reply');
const advertise = require('./routes/advertise')
const user = require('./routes/user');
const port = process.env.PORT || config.port
// 跨域配置
const cors = require('koa-cors');

// 校验参数模块
const bouncer = require('koa-bouncer');
// 错误处理中间件
const catchError = require('./middlewares/exception');
app.use(catchError);
// error handler
onerror(app)
// 帮助函数的引入
const helpers = require('handlebars-helpers');
helpers.comparison({
  handlebars: hbs.handlebars
})

// middlewares
app.use(bodyparser())
  .use(bouncer.middleware())//校验参数模块的中间件
  .use(json())
  .use(cors())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  // .use(views(path.join(__dirname, '/views'), {
  //   options: { settings: { views: path.join(__dirname, 'views') } },
  //   map: { 'hbs': 'handlebars' },
  //   extension: 'hbs'
  // }))
  .use(router.routes())
  .use(router.allowedMethods())
// 注册hbs中间件

app.use(hbs.middleware({
  viewPath: __dirname + '/views',//视图根目录
  defaultLayout: 'layout',//默认布局页面
  partialsPath: __dirname + '/views/partials',//注册partials目录
  disableCache: true//开发阶段不缓存
}))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

// router.get('/', async (ctx, next) => {
//   // ctx.body = 'Hello World'
//   ctx.state = {
//     title: 'Koa2'
//   }
//   await ctx.render('index', ctx.state)
// })
// 连接数据库
const MongoDb = require('./db');
MongoDb.connect();
// routes(router)
// 后端模板引擎的配置
app.use(index.routes(), index.allowedMethods());
// resful api接口的配置
admin(router)
category(router);
article(router);
comment(router);
reply(router);
advertise(router);
user(router);
app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
