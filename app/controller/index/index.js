const BaseController = require('../../../utils/BaseController')
const UserModel = require('../../model/AdminModel')

class IndexController extends BaseController{
     async get(req, res){
         res.send('hello world')
    }
}

module.exports = IndexController
