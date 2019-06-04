'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const { INTEGER, DATE, STRING } = Sequelize;
      await queryInterface.createTable('roles', {
          id: { type: INTEGER, primaryKey: true, autoIncrement: true },
          rolename: STRING(30),
          desc: STRING(200),
          createdAt: DATE,
          updatedAt: DATE,
      })
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('roles');
  }
};
