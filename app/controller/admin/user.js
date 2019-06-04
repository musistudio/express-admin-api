const BaseController = require('../../../utils/BaseController')
const md5 = require('md5-node')

/**
 * user表CURD接口
 * 遵循Restful规范
 */
class UserController extends BaseController {
    // 查询用户接口
    async get(req, res) {
        let users = [];
        this.model.UserModel.hasMany(this.model.UserRoleModel);
        this.model.UserRoleModel.belongsTo(this.model.RoleModel, {foreignKey: 'roleId'});
        let results = await this.model.UserModel.findAll({
            include: [{ model: this.model.UserRoleModel }]
        });
        for(let i=0;i<results.length;i++) {
            let roles = [];
            let user_roles = results[i]['dataValues']['user_roles'];
            for(let j=0;j<user_roles.length;j++) {
                let ros = await this.model.RoleModel.findOne({
                    where: {id: results[i]['dataValues']['user_roles'][j]['dataValues']['roleId']}
                })
                roles.push(ros.rolename)
            }
            users.push({
                id: results[i]['dataValues']['id'],
                username: results[i]['dataValues']['username'],
                roles: roles
            })
        }
        res.json({users})
    }
    // 新增用户接口
    async post(req, res) {
        let {username, password, roles} = req.body;
        roles = roles.split(',');
        let results = await this.model.UserModel.findOrCreate({
            where: { username },
            defaults: { password: md5(password) }
        })
        if(results[1]) {
            let user = results[0]['dataValues']['id'];
            for(let i=0;i<roles.length;i++) {
                let role = await this.model.RoleModel.findOne({
                    where: { id: roles[i]}
                })
                if(role) {
                    await this.model.UserRoleModel.create({
                        userId: user,
                        roleId: roles[i]
                    })
                }
            }
            res.json({
                code: 200,
                msg: "创建成功"
            })
        }else{
            res.json({
                code: 500,
                msg: "已存在该用户，不能重复创建"
            })
        }
    }
    // 修改用户接口
    async put(req, res) {
        let {id, username, password, roles} = req.body;
        await this.model.UserModel.update({
            username,
            password
        },{
            where: {id}
        })
        await this.model.UserRoleModel.destroy({
            where: {userId:id}
        })
        if(roles) {
            for(let i=0;i<roles.length;i++) {
                let record = await this.model.RoleModel.findOne({
                    where: {id: roles[i]}
                })
                if(record) {
                    await this.model.UserRoleModel.create({
                        userId: id,
                        roleId: roles[i]
                    })
                }
            }
        }
        res.json({
            code: 200,
            msg: '修改成功'
        })
    }
    // 删除用户接口
    async delete(req, res) {
        let {id} = req.body;
        id = id.split(',')
        for(let i=0;i<id.length;i++) {
            let result = await this.model.UserModel.destroy({
                where: {id: id[i]}
            })
            if(result) {
                await this.model.UserRoleModel.destroy({
                    where: {userId:id[i]}
                })
            }
        }
        res.json({
            code: 200,
            msg: '删除成功'
        })
    }
}

module.exports = UserController
