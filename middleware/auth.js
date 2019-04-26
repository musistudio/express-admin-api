// 权限验证中间件

exports.auth = function (req, res, next) {
    let token = req.body.token || req.query.token || req.get('Authorize')
    console.log('token',token);
    if(token) {
        try {
            let result = req.jwt.verifyToken(token)
            req.user = result
            next()
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
