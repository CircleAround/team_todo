'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'creatorId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' }
    }),
    await queryInterface.addColumn('Tasks', 'assigneeId', {
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tasks', 'createId'),
    await queryInterface.removeColumn('Tasks', 'assigneeId');
  }
};
