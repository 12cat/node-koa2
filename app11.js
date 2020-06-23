/**
 * cookie
 * 
 */
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
	if (ctx.url === '/index') {
		ctx.cookies.set(
			'name',
			'12cat',
			{
				// domain: 'biyao.com',	// 域名
				// path: '/',				// 路径
				maxAge: 10 * 60 * 1000,	// 有效时长
				// expires: new Date('2018-12-25 15:00:00'),	// 失效时间
				// httpOnly: false,		// 是否只用于http请求
				// overwrite: false		// 是否允许重写
			}
		)
		ctx.body = 'cookie is ok'
	} else {
		ctx.body = 'hello world'
	}
})

app.listen(3000, () => {
	console.log('[demo] start-quick is starting at port 3000')
})