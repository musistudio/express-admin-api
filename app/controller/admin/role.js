const BaseController = require('../../../utils/BaseController')

/**
 * role表CURD接口
 * 遵循Restful规范
 */
class RoleController extends BaseController {
    async get(req, res) {
        let results = await this.model.RoleModel.findAll();
        res.json(results)
    }
    async post(req, res) {
        let {name, desc} = req.body;
        let results = await this.model.RoleModel.findOrCreate({
            where: {rolename: name},
            defaults: {desc}
        })
        if(results[1]){
            res.json({
                code: 200,
                msg: '添加成功'
            })
        }else{
            res.json({
                code: 500,
                msg: '已存在角色组，添加失败'
            })
        }
    }
    async put(req, res) {
        let {id, name, description} = req.body;
        let results = await this.model.RoleModel.update({
            rolename: name,
            desc: description
        },{
            where: {id}
        })
        if(results[0]){
            res.json({
                code: 200,
                msg: '修改成功'
            })
        }else{
            res.json({
                code: 500,
                msg: '修改失败'
            })
        }
        
    }
    async delete(req, res) {
        let {id} = req.body;
        id = id.split(',')
        for(let i=0;i<id.length;i++) {
            await this.model.RoleModel.destroy({
                where: {id: id[i]}
            })
        }
        res.json({
            code: 200,
            msg: '删除成功'
        })
    }
}

module.exports = RoleController
