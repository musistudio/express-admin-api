'use strict';

const {Sequelize} = require('../../middleware/sequelize')
const { STRING, INTEGER, DATE } = Sequelize;

const UserRole = Sequelize.sequelize.define('role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    rolename: STRING(30),
    desc: STRING(200),
    createdAt: DATE,
    updatedAt: DATE,
});

module.exports = UserRole;
