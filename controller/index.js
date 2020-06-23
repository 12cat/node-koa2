const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const router = new Router()

// 子路由1
let home = new Router()
home.get('/', async (ctx) => {
	let html = `
		<ul>
			<li><a href="/page/helloworld">helloworld</a></li>
			<li><a href="/page/404">404</a></li>
			<li><a href="/api/getList">getList</a></li>
			<li><a href="/api/getInfo/0">getInfo/:id</a></li>
		</ul>
	`
	ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async (ctx) => { // /page/404
		ctx.body = '404 page!'
	})
	.get('/helloworld', async (ctx) => { // /page/helloworld
		ctx.body = 'helloworld page!'
	})

// 子路由
let api = new Router()
api.post('/login', async (ctx, next) => { // 登录，默认账号：test，密码：test123
		let postData = ctx.request.body
		let res = {
			success: 0,
			data: null,
			error: ''
		}
		if (postData.userName === 'test' && postData.password === 'test123') {
			res.success = 1
			res.data = {name: 'admin'}
		} else {
			res.error = '用户名或密码错误！'
		}
		ctx.body = res
	})
	.get('/getList', async (ctx, next) => {
		let data = [
			{key: 0, title: '咖啡'},
			{key: 1, title: '男装'},
			{key: 2, title: '鞋靴'},
			{key: 3, title: '美妆'},
			{key: 4, title: '电器'},
			{key: 5, title: 'error'}
		]
		ctx.body = {
			success: 1,
			data,
			error: ''
		}
	})
	// .get('/getInfo/:id', async (ctx, next) => {
	// let key = ctx.params.id
	.get('/getInfo', async (ctx, next) => {
		let key = ctx.query.id
		let dataList = {
			0: ['手冲定制咖啡6杯'],
			1: ['男士商务休闲保暖羽绒服', '700+蓬松度白鹅绒男羽绒服', '暖心呵护 高蓬松鹅绒马甲', 'RC男士连帽轻薄羽绒服'],
			2: ['道步减震透气运动休闲男鞋', '性感蕾丝面透气猫跟鞋', '尖头浅口细高跟女鞋 65mm', '公主水晶尖头细跟婚鞋'],
			3: ['赋妍抗皱精华液', '小黑瓶保湿淡纹修护肌底液', '小分子糖原原液', '羊胎素驻颜原液', '黑炭净颜呼吸泡泡面膜'],
			4: ['欧式304不锈钢电水壶', '压力咖啡机胶囊机蒸汽奶泡', '无线肌肉按摩哑铃', '智能光控灭蚊器', '声波电动牙刷']
		}
		if (key == 5) {
			ctx.body = {
				success: 0,
				data: null,
				error: 'IS ERROR'
			}
		} else {
			ctx.body = {
				success: 1,
				data: dataList[key],
				error: ''
			}
		}
	})
	.get('/test/getDataList', async (ctx, next) => {
		let dataList = [
			{id:1001, name:'手冲定制咖啡6杯', color:'黑色', price:10},
			{id:1002, name:'手冲定制咖啡6杯', color:'白色', price:10},
			{id:1003, name:'男士商务休闲保暖羽绒服', color:'蓝色', price:1200},
			{id:1004, name:'男士商务休闲保暖羽绒服', color:'白的', price:10},
			{id:1005, name:'蓬松度白鹅绒男羽绒服', color:'粉色', price:998},
			{id:1006, name:'蓬松度白鹅绒男羽绒服', color:'黄色', price:1098},
			{id:1007, name:'高蓬松鹅绒马甲', color:'褐色', price:600},
			{id:1008, name:'RC男士连帽轻薄羽绒服', color:'灰色', price:689},
			{id:1009, name:'道步减震透气运动休闲男鞋', color:'白色', price:540},
			{id:1010, name:'道步减震透气运动休闲男鞋', color:'粉色', price:540},
			{id:1011, name:'性感蕾丝面透气猫跟鞋', color:'白色', price:1250},
			{id:1012, name:'尖头浅口细高跟女鞋', color:'粉红', price:700},
			{id:1013, name:'公主水晶尖头细跟婚鞋', color:'白色', price:2100},
			{id:1014, name:'欧式304不锈钢电水壶', color:'绿色', price:65},
			{id:1015, name:'压力咖啡机胶囊机蒸汽奶泡', color:'白色', price:689},
			{id:1016, name:'智能光控灭蚊器', color:'白色', price:860},
			{id:1017, name:'无线肌肉按摩哑铃', color:'黑白', price:689},
			{id:1018, name:'声波电动牙刷', color:'白色', price:632},
			{id:1019, name:'声波电动牙刷', color:'黑', price:632}
		]
		ctx.body = {
			success: 1,
			data: dataList,
			error: ''
		}
	})
	.get('/test/getList', async (ctx, next) => {
		let res = ctx.query
		let dataList = []
		if (res.pageIndex == 1) {
			dataList = [
				{id:1001, name:'手冲定制咖啡6杯', color:'黑色', price:10},
				{id:1002, name:'手冲定制咖啡6杯', color:'白色', price:10},
				{id:1003, name:'男士商务休闲保暖羽绒服', color:'蓝色', price:1200},
				{id:1004, name:'男士商务休闲保暖羽绒服', color:'白的', price:10},
				{id:1005, name:'蓬松度白鹅绒男羽绒服', color:'粉色', price:998},
				{id:1006, name:'蓬松度白鹅绒男羽绒服', color:'黄色', price:1098},
				{id:1007, name:'高蓬松鹅绒马甲', color:'褐色', price:600},
				{id:1008, name:'RC男士连帽轻薄羽绒服', color:'灰色', price:689},
				{id:1009, name:'道步减震透气运动休闲男鞋', color:'白色', price:540},
				{id:1010, name:'道步减震透气运动休闲男鞋', color:'粉色', price:540}
			]
		} else if (res.pageIndex == 2) {
			dataList = [
				{id:1011, name:'性感蕾丝面透气猫跟鞋', color:'白色', price:1250},
				{id:1012, name:'尖头浅口细高跟女鞋', color:'粉红', price:700},
				{id:1013, name:'公主水晶尖头细跟婚鞋', color:'白色', price:2100},
				{id:1014, name:'欧式304不锈钢电水壶', color:'绿色', price:65},
				{id:1015, name:'压力咖啡机胶囊机蒸汽奶泡', color:'白色', price:689},
				{id:1016, name:'智能光控灭蚊器', color:'白色', price:860},
				{id:1017, name:'无线肌肉按摩哑铃', color:'黑白', price:689},
				{id:1018, name:'声波电动牙刷', color:'白色', price:632},
				{id:1019, name:'声波电动牙刷', color:'黑', price:632},
				{id:1020, name:'声波电动牙刷', color:'粉色', price:632}
			]
		} else {
			dataList = [
				{id:1021, name:'ELAMTO 新疆长绒棉填充秋冬款绗缝被芯', color:'白色', price:229},
				{id:1022, name:'M&N 60全棉贡缎大提花双宫桑蚕丝被', color:'白色', price:699},
				{id:1023, name:'Blilin 清水一擦易净小白鞋皮具神奇魔术清洁擦 12片装', color:'白色', price:59},
				{id:1024, name:'科尔沁草原风干牛肉干208g', color:'原色', price:65},
				{id:1025, name:'英国STRIX温控器双层防烫电热水壶BRS-K170', color:'蓝色', price:99},
				{id:1026, name:'苏薇之恋发热纤维女士打底保暖内衣套装', color:'暗红', price:149},
				{id:1027, name:'苏薇之恋发热纤维女士打底保暖内衣套装', color:'裸粉', price:149}
			]
		}
		res.total = 27
		ctx.body = {
			success: 1,
			data: {
				query: res,
				data: dataList
			},
			error: ''
		}
	})

// 装载所有子路由
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

module.exports = function (app) {
	app.use(bodyParser())
	app.use(router.routes())
	// app.use(router.routes()).use(router.allowedMethods())
}