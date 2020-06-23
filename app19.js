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
		console.log(111)
		await ctx.render('xss_demo.html')
	} else if (ctx.url.indexOf('update') > 0 && ctx.method === 'GET') {
		console.log(222, ctx.query)
		ctx.body = ctx.query
	} else if (ctx.url === '/' && ctx.method === 'POST') {
		console.log(333, ctx.request.body)
		ctx.body = ctx.request.body
	} else {
		console.log(444, ctx.query)
		let query = ctx.query
		ctx.body = `
			<h1>XSS</h1>
			<h1>你查询的内容为：${ ctx.query.query }</h1>
		`
	}
})

app.listen(3000, () => {
	console.log('[demo] start-quick is starting at port 3000')
})