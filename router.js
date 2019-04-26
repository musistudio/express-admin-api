// 路由配置文件
const Controllers = require('./utils/loadController')

const Routers = {
    '/': {
        'get': Controllers.index.index,
        'api': {
            'get': Controllers.index.index,
            'auth': true
        },
        'admin/': {
            'get': Controllers.admin.index,
            'login': {
                'post': Controllers.admin.login
            }
        }
    }
}

module.exports = Routers
