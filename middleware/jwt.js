// jsonwebtoken 中间件

const jwt = require('jsonwebtoken')
const { app } = require('../utils/app')

exports.jwt = function (req, res, next) {
    jwt.getToken = user => Buffer.from(jwt.sign(user, app.get('cookieSecret'), {expiresIn: 60})).toString('base64')
    jwt.verifyToken = token => jwt.verify(Buffer.from(token, 'base64').toString(), app.get('cookieSecret'))
    req.jwt = jwt
    next()
}
