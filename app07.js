/**
 * koa post请求
 * 
 */
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next)=> {
	// 处理跨域问题
	ctx.set('Access-Control-Allow-Origin', '*')
	ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
	ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
	// options 请求预检，直接返回200
	if (ctx.method == 'OPTIONS') {
		ctx.body = 200
	} else {
		await next()
	}
})

app.use(async (ctx) => {
	if (ctx.url === '/' && ctx.method === 'GET') {
		// GET请求，返回表单页面
		let html = `
			<h1>request post demo</h1>
			<form method="post" action="/">
				<p>userName</p>
				<input name="userName" />
				<p>nickName</p>
				<input name="nickName" />
				<p>emial</p>
				<input name="emial" /><br/>
				<button type="submit">submit</button>
			</form>
		`
		ctx.body = html
	} else if (ctx.url === '/' && ctx.method === 'POST') {
		// POST请求，解析POST表单数据
		let postData = await parsePostData(ctx)
		ctx.body = postData
	} else {
		// 其它显示404
		ctx.body = '<h1>404</h1>'
	}
})

// 解析上下文中ndoe原生请求的POST参数
function parsePostData(ctx) {
	return new Promise((resolve, reject) => {
		try {
			let postdata = ''
			ctx.req.addListener('data', (data) => {
				postdata += data
			})
			ctx.req.addListener('end', () => {
				let parseData = parseQueryStr(postdata)
				resolve(parseData)
			})
		} catch (err) {
			reject(err)
		}
	})
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
	let queryData = {}
	let queryStrList = queryStr.split('&')
	for (let[index, queryStr] of queryStrList.entries()) {
		let itemList = queryStr.split('=')
		queryData[itemList[0]] = decodeURIComponent(itemList[1])
	}
	return queryData
}

app.listen(3000, () => {
	console.log('[demo] start-quick is starting at port 3000')
})