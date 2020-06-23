/**
 * 文件上传
 * 
 */
const Koa = require('koa')
const path = require('path')
const app = new Koa()

const {uploadFile} = require('./util/upload')

app.use(async (ctx) => {
	if (ctx.url === '/' && ctx.method === 'GET') {
		// GET请求返回表单页面
		let html = `
			<h1>koa2 upload demo</h1>
			<form method="POST" action="/upload.json" enctype="multipart/form-data">
				<p>file upload</p>
				<span>picName:</span><input name="picName" type="text"/><br/>
				<input name="file" type="file"/><br/><br/>
				<button type="submit">submit</button>
			</form>
		`
		ctx.body = html
	} else if (ctx.url === '/upload.json' && ctx.method === 'POST') {
		// 上传问价你请求处理
		let result = {success: false}
		let serverFilePath = path.join(__dirname, 'upload-files')
		// 上传文件事件
		result = await uploadFile(ctx, {
			fileType: 'album',	// common or album
			path: serverFilePath
		})
		ctx.body = result
	} else {
		// 其它请求显示404
		ctx.body = '<h1>404</h1>'
	}
})

app.listen(3000, () => {
	console.log('[demo] start-quick is starting at port 3000')
})