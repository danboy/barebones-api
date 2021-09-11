'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4()
      },
      name: {
        type: Sequelize.STRING
      },
      deleted: {
        type: Sequelize.BOOLEAN
      },
      handle: {
        type: Sequelize.STRING
      },
      parent_handle: {
        type: Sequelize.STRING
      },
      client_details: {
        type: Sequelize.JSONB
      },
      config: {
        type: Sequelize.JSONB
      },
      website: {
        type: Sequelize.STRING
      },
      contact_email: {
        type: Sequelize.STRING
      },
      contact_name: {
        type: Sequelize.STRING
      },
      contact_phone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clients');
  }
};
