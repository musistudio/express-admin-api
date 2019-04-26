const BaseController = require('../../../utils/BaseController')

class IndexController extends BaseController{
    get(req, res){
        res.send('hello admin')
    }
}

module.exports = IndexController
