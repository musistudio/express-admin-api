const { app } = require('./utils/app')
const { jwt } = require('./middleware/jwt')
const bodyParser = require('body-parser')
const routers = require('./router')
const ejs = require('ejs')
const express = require('express')

app.use(express.static('app/views/'))

// 使用中间件解析参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// 使用jsonwebtoken中间件
app.use(jwt)

app.set('views', 'app/views')
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)


//设置跨域访问，开发环境下请关闭
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
   // res.header("Content-Type", "*");
    next();
})

// 解析路由
app.map(routers)


// 监听端口启动
app.start()
