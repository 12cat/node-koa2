/**
 * jsonp
 * 
 */
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
	// jsonp 的GET请求
	if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {
		// 后去jsonp的callback
		let callbackName = ctx.query.callback || 'callback'
		let returnData = {
			success: true,
			data: {
				text: 'this is a jsonp api',
				time: new Date().getTime()
			}
		}
		// jsonp的script字符串
		// let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
		let jsonpStr = returnData
		// 用text/javascript让请求支持跨域
		ctx.type = 'text/javascript'
		// 输出jsonp字符串
		ctx.body = jsonpStr
	} else {
		ctx.body = 'hello jsonp'
	}
})

app.listen(3000, () => {
	console.log('[demo] start-quick is starting at port 3000')
})