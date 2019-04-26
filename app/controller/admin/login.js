const BaseController = require('../../../utils/BaseController')

class LoginController extends BaseController{
    async post(req, res){
        let username = req.body.username
        let password = req.body.password
        let result = await this.model.AdminModel.findOne({
            where: {username, password}
        })
        if(result) {
            let token = req.jwt.getToken({username, password})
            res.json({
                code: 200,
                msg: 'login successful',
                token: token,
            });
        }else {
            res.json({
                code: 401,
                msg: '用户名或密码错误'
            });
        }

    }
}

module.exports = LoginController
