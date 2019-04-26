const {Sequelize} = require('../../middleware/sequelize')
const sequelize = Sequelize.sequelize

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
});

User.sync({force: true}).then(function () {
    // 同步数据表，并创建管理员用户
    return User.create({
        username: 'admin',
        password: '123456'
    });
});

exports.UserSchema =  User
