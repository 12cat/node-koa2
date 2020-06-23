/**
 * koa-static
 * 
 */
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa()

const staticPath = './static'	// 静态资源目录

app.use(static(path.join(__dirname, staticPath)))

app.use(async (ctx) => {
	ctx.body = 'hello app10'
})

app.listen(3000, () => {
	console.log('[demo] start-quick is starting at port 3000')
})