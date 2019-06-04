/**
 * 基于Restful路由风格实现
 * 对菜单增删改查
 */

'use strict';

const BaseController = require('../../../utils/BaseController')

class MenuController extends BaseController{

    /**
     * 查询菜单列表
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async get(req, res){
        let results = await this.model.MenuModel.find()
        res.send(results)
    }

    /**
     * 添加菜单
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async post(req, res) {
        let {id, name, icon, url, type, role, parent} = req.body
        let result
        if(!parent) {
            let count = await this.model.MenuModel.find()
            result = await this.model.MenuModel.create({id: +count[count.length-1].id + 1, name, icon, url, type, role})
        }else if(!parent.includes('-')) {
            let document = await this.model.MenuModel.find({id: parent})
            let d_id = `${parent}-${Number(document[0].children[document[0].children.length-1].id.split('-')[1]) + 1}`
            let child = {id: d_id, name, icon, url, type, role}
            document[0].children.push(child)
            result = await this.model.MenuModel.update({id: document[0]['id']}, document[0])
        } //else {
        //     let p_id = parent.split('-')[0]
        //     let document = await this.model.MenuModel.find({id: p_id})
        //     console.log(document);
        //     let childrden = document[0]['children']
        //     childrden.forEach(child=>{
        //         if(child.id === parent) {
        //             if(child.children) {
        //                 let c_id = child.children[child.children.length - 1][id].split('-')
        //                 child.children.push({id: `${c_id[0]}-${c_id[1]}-${+c_id[2]+1}`})
        //             }else {
        //                 child.children = [{id: `${parent}-1`, name, icon, url, type, role}]
        //             }
        //         }
        //     })
        //     result = await this.model.MenuModel.update({id: document[0]['id']}, document[0])
        // }
        // const document = {id, name, icon, url, type, role, parent}
        // console.log(document)
        // let result = await this.model.MenuModel.create(document)
        // result ? res.json({
        //     code: 200,
        //     msg: '添加成功'
        // }) : res.json({
        //     code: 510,
        //     mdg: '添加失败'
        // })
    }

    /**
     * 修改菜单
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async put(req, res) {
        let {id, name, icon, children} = req.body
        console.log(req.body)
        const document = {
            id,
            name,
            icon,
            children
        }
        res.json({code: 200})
        // let result = await this.model.MenuModel.update({id}, document)
        // result ? res.json({
        //     code: 200,
        //     msg: '修改成功'
        // }) : res.json({
        //     code: 510,
        //     mdg: '修改失败'
        // })
    }

    /**
     * 删除菜单
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async delete(req, res) {
        let {id} = req.query
        let result
        if(id.includes('-')) {
            let ids = id.split('-')
            let document = await this.model.MenuModel.find({id: ids[0]})
            let children  = document[0]['children']
            document[0]['children'].forEach((child, index)=>{
                if(child.id==id){
                    document[0]['children'].splice(index, 1)
                }
            })
            result = await this.model.MenuModel.update({'id': ids[0]}, document[0])
        }else {
            result = await this.model.MenuModel.remove({'id': id})
        }
        result ? res.json({
            code: 200,
            msg: '删除成功'
        }) : res.json({
            code: 510,
            mdg: '删除失败'
        })
    }
}

module.exports = MenuController
