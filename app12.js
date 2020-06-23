/**
 * session
 * 
 */
const Koa = require('koa')
const session = require('koa-session-minimal')
const app = new Koa()

// 存放sessionId的cookie配置
let cookie = {}

// 使用session
app.use(session({key: 'SESSION_ID', cookie: cookie}))

app.use(async (ctx) => {
	if (ctx.url === '/set') {		// 设置session
		ctx.session = {
			user_id: Math.random().toString(36).substr(2),
			count: 0
		}
		ctx.body = ctx.session
	} else if (ctx.url === '/') {	// 获取session
		ctx.session.count++
		ctx.body = ctx.session
	}
})

app.listen(3000, () => {
	console.log('[demo] start-quick is starting at port 3000')
})