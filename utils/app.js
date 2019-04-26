const express = require('express')
const app = express()
const Router = express.Router()
const verbose = process.env.NODE_ENV != 'test'
const BaseController = require('./BaseController')
const { config } = require('../config')
const {auth} = require('../middleware/auth')


app.set('cookieSecret', config.cookieSecret);

app.map = function(a, route){
    route = route || '';
    for (let key in a) {
        if(typeof a[key] === 'object') {
            if(a[key] instanceof BaseController) {
                a['auth'] ? app.use(route, auth) : null     // 需要鉴权路由
                app[key](route, a[key][key].bind(a[key]))
            }else{
                app.map(a[key], route + key)
            }
        }
    }
}

app.start = () => app.listen(config.server.port, () => console.log(`the server is running on ${`${config.server.ip}:${config.server.port}`}`))

exports.app = app
