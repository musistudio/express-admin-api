// 框架配置文件
const md5=require('md5-node')


exports.config = {
    // 数据库配置
    db: {
        dbname: 'myadmin',   // 数据库名
        username: 'root',    // 用户名
        password: 'lijinhui',// 密码
        options: {           // 配置项
            'dialect': 'mysql', // 使用mysql数据库
            'host': 'localhost',// 主机
            'port': 3306        // 端口
        }
    },

    // 服务器配置
    server: {
        ip: 'localhost',
        port: 3000
    },

    cookieSecret: md5('express-admin-api-system')
}


