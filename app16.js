/**
 * 异步图片上传
 * 
 */
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const convert = require('koa-convert')
const static = require('koa-static')
const {uploadFile} = require('./util/upload2')

const app = new Koa()
const staticPath = './static'

app.use(views(path.join(__dirname, './view'), {extension: 'ejs'}))
app.use(convert(static(path.join(__dirname, staticPath))))

app.use(async (ctx) => {
	if (ctx.method === 'GET') {
		let title = 'upload pic async'
		await ctx.render('index2', {title})
	} else if (ctx.url === '/api/picture/upload.json' && ctx.method === 'POST') {
		// 上传文件请求处理
		let result = {success: false}
		let serverFilePath = path.join(__dirname, 'static/image')
		// 上传文件事件
		result = await uploadFile(ctx, {
			fileType: 'album',
			path: serverFilePath
		})
		ctx.body = result
	} else {
		// 其它请求404
		ctx.body = '<h1>404</h1>'
	}
})

app.listen(3000, () => {
	console.log('[demo] start-quick is starting at port 3000')
})