'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
      await queryInterface.createTable('user_role', {
          id: { type: INTEGER, primaryKey: true, autoIncrement: true },
          userId: INTEGER,
          roleId: INTEGER,
          createdAt: DATE,
          updatedAt: DATE,
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_role');
  }
};
