'use strict';

const {Sequelize} = require('../../middleware/sequelize')
const { STRING, INTEGER, DATE } = Sequelize;

const User = Sequelize.sequelize.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    password: STRING(32),
    createdAt: DATE,
    updatedAt: DATE,
});

module.exports = User;
