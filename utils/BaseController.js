const { app } = require('./app')
const { config } = require('../config')
const request = require('request')
const model = require('./loadModel')
const service = require('./loadService')

class BaseController {
    constructor() {
        this.app = app
        this.config = config
        this.model = model
        this.service = service
    }
    $http(options) {
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                (error || response.statusCode !== 200) ? reject(error) : resolve(body)
            });
        })
    }
}


module.exports = BaseController
