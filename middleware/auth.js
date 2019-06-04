// 权限验证中间件

exports.auth = function (req, res, next) {
    let token = req.body.token || req.query.token || req.get('token')
    if(token) {
        try {
            let result = req.jwt.verifyToken(token)
            req.user = result
            if(result.roles.some(item => req.allowed.includes(item.rolename))) {
                next();
            }else{
                res.json({
                    'code': 401,
                    'msg': '用户所在的角色组没有权限'
                })
            }
        }catch (e) {
            res.json({
                'code': 401,
                'msg': 'Invalid token'
            })
        }
    }else {
        res.json({
            'code': 401,
            'msg': 'Invalid token'
        })
    }
}
