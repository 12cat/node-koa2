/**
 * 原生koa2实现静态资源服务器
 * 
 */
const fs = require('fs')

// 读取文件方法
function file(filePath) {
	let content = fs.readFileSync(filePath, 'binary')
	return content
}

module.exports = file
