/**
 * koa-bodyparser
 * 
 */
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

// 加载模板引擎
app.use(views(path.join(__dirname, './view')))

app.use(bodyParser())	// 使用ctx.body解析中间件

app.use(async (ctx) => {
	if (ctx.url === '/' && ctx.method === 'GET') {
		// GET请求，返回表单页面
		// ctx.body = 'home'
		// ctx.status = 301
		// ctx.redirect('/cart')
		await ctx.render('home.html')
	} else if (ctx.url === '/' && ctx.method === 'POST') {
		// POST请求，解析POST表单数据
		let postData = ctx.request.body
		ctx.body = postData
	} else {
		// 其它显示404
		ctx.body = '<h1>404</h1>'
	}
})

app.listen(3000, () => {
	console.log('[demo] start-quick is starting at port 3000')
})