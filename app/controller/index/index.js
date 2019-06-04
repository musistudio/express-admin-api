const BaseController = require('../../../utils/BaseController')


class IndexController extends BaseController{
     async get(req, res){
         res.send('1')
         // res.render('index.html')
    }
}

module.exports = IndexController
