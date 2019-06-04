// sequelize ORM

const Sequelize = require('sequelize')
const { config } = require('../config')

Sequelize.sequelize = new Sequelize(config.dbs.mysql.dbname, config.dbs.mysql.username,
    config.dbs.mysql.password, config.dbs.mysql.options)

module.exports = Sequelize;
