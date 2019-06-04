// 路由配置文件
const Controllers = require('./utils/loadController')

const Routers = {
    '/': {
        'get': Controllers.index.index,
        'api/': {
            'get': Controllers.index.index,
            'menus': {
                'get': Controllers.api.menu,
                'post': Controllers.api.menu,
                'put': Controllers.api.menu,
                'delete': Controllers.api.menu,
            }
        },
        'admin/': {
            'auth': ['超级管理员'],    // 打开鉴权
            'get': Controllers.admin.index,
            'login': {
                'post': Controllers.admin.login
            },
            'dashboard/': {
                'user': {
                    'get': Controllers.admin.user,
                    'post': Controllers.admin.user,
                    'put': Controllers.admin.user,
                    'delete': Controllers.admin.user
                },
                'role': {
                    'get': Controllers.admin.role,
                    'post': Controllers.admin.role,
                    'put': Controllers.admin.role,
                    'delete': Controllers.admin.role
                }
            }
        }
    }
}

module.exports = Routers
