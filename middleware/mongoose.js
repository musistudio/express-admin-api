// mongoose ORM

const Mongoose = require('mongoose')
const { config } = require('../config')


Mongoose.connect(`mongodb://${config.dbs.mongodb.HOST}:${config.dbs.mongodb.PORT}/${config.dbs.mongodb.DBNAME}`);

/**
 * 连接成功
 */
Mongoose.connection.on('connected', function () {
    console.log('Mongoose connectionned successfully');
});

/**
 * 连接异常
 */
Mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
Mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});


exports.Mongoose = Mongoose;
