const BaseController = require('../../../utils/BaseController')
const md5 = require('md5-node')

/**
 * 登陆接口
 * 默认只提供post方法
 */
class LoginController extends BaseController {
    async post(req, res) {
        let { username, password } = req.body
        let result = await this.model.UserModel.findOne({
            where: { username, password: md5(password) },
        })
        if (result) {
            let roles = [];
            let userId = result.dataValues.id
            this.model.UserRoleModel.belongsTo(this.model.RoleModel, {foreignKey: 
'roleId'});
            let records = await this.model.UserRoleModel.findAll({
                where: { userId },
                include: [{
                    model: this.model.RoleModel,
                    attributes: ['rolename', 'desc']
                }]
            })
            records.forEach(record=>{
                roles.push(record.dataValues.role.dataValues)
            })
            let token = req.jwt.getToken({ username, roles })    // 将用户名、权限组打包进token
            res.json({
                code: 200,
                msg: 'login successful',
                token: token
            });
        } else {
            res.json({
                code: 401,
                msg: '用户名或密码错误'
            });
        }
    }
}

module.exports = LoginController
