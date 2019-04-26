const { app } = require('./utils/app')
const { jwt } = require('./middleware/jwt')
const bodyParser = require('body-parser')
const routers = require('./router')


// 使用中间件解析参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// 使用jsonwebtoken中间件
app.use(jwt)

// 解析路由
app.map(routers)

// 监听端口启动
app.start()
