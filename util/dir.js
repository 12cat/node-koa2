/**
 * 原生koa2实现静态资源服务器
 * 
 */
const url = require('url')
const fs = require('fs')
const path = require('path')

const walk = require('./walk')		// 遍历读取目录内容方法

// 封装目录内容
function dir(url, reqPath) {
	// 遍历读取当前目录下的文件，子目录
	let contentList = walk(reqPath)
	let html = '<ul>'
	for (let [index, item] of contentList.entries()) {
		html = `${html}<li><a href="${url==='/'?'':url}/${item}">${item}</a>`
	}
	html = `${html}</ul>`
	return html
}

module.exports = dir