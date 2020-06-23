/**
 * demo
 * 
 */
const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const views = require('koa-views')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session-minimal')

const config = require('./config')
const routers = require('./routers/index')

const app = new Koa()

// 配置session
app.use(session({key: 'USER_SID'}))
// 配置控制台日志
app.use(conver(logger))
// 配置body解析
app.use(bodyParser())
// 配置静态资源加载
app.use(convert(static(path.join(__dirname, './static'))))
// 配置服务端渲染模版
app.use(views(path.join(__dirname, './views'), {extension: 'ejs'}))
// 配置初始化路由
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(config.port, () => {
	console.log(`the server is start at port ${config.port}`)
})