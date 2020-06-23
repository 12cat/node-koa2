/**
 * 原生koa2实现静态资源服务器
 * 
 */
let mimes = {
	'css': 'text/css',
	'less': 'text/css',
	'git': 'image/gif',
	'html': 'text/html',
	'ico': 'image/ico',
	'jpeg': 'image/jpeg',
	'jpg': 'image/jpg',
	'js': 'text/javascript',
	'json': 'application/json',
	'pdf': 'application/pdf',
	'png': 'image/png',
	'svg': 'image/svg+xml',
	'swf': 'application/x-shockwave-flash',
	'tiff': 'image/tiff',
	'txt': 'text/plain',
	'wav': 'audio/x-wav',
	'wma': 'audio/x-ms-wma',
	'wmv': 'video/x-ms-wmv',
	'xml': 'text/xml'
}

module.exports = mimes