'use strict';

const {Sequelize} = require('../../middleware/sequelize')
const { INTEGER, DATE } = Sequelize;

const UserRole = Sequelize.sequelize.define('user_role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: INTEGER,
    roleId: INTEGER,
    createdAt: DATE,
    updatedAt: DATE,
},{
    freezeTableName: true
});

module.exports = UserRole;
