// sequelize ORM

const Sequelize = require('sequelize')
const { config } = require('../config')

Sequelize.sequelize = new Sequelize(config.db.dbname, config.db.username,
    config.db.password, config.db.options)



// exports.Sequelize = Sequelize
module.exports = Sequelize;
