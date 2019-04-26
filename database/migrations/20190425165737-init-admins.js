'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 升级数据库时创建admin表
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('admins', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      password: STRING(32),
      createdAt: DATE,
      updatedAt: DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    // 降级数据库时删除admin表
    await queryInterface.dropTable('admin');
  }
};
