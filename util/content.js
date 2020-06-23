/**
 * 原生koa2实现静态资源服务器
 * 
 */
const path = require('path')
const fs = require('fs')

const dir = require('./dir')
const file = require('./file')

// 获取静态资源内容
async function content(ctx, fullStaticPath) {
	// 封装请求资源的绝对路径
	let reqPath = path.join(fullStaticPath, ctx.url)
	// 判断请求路径是否存在目录或文件
	let exist = fs.existsSync(reqPath)
	// 返回请求内容，默认为空
	let contetn = ''

	if (!exist) {
		// 请求路径不存在，返回404
		content = '404 Not Found!'
	} else {
		// 判断访问地址是文件夹还是文件
		let stat = fs.statSync(reqPath)
		if (stat.isDirectory()) {		// 目录
			content = dir(ctx.url, reqPath)
		} else {						// 文件
			content = await file(reqPath)
		}
	}
	return content
}

module.exports = content