'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user_id = uuidv4();
    const admin = {
      id: user_id,
      email: 'admin@example.com',
      password: 'pAssw0rd',
      slug: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const user = await queryInterface.bulkInsert('users', [admin]);
 
    return queryInterface.bulkInsert('role_assignments', [{
      user_id: user_id,
      actor_id: user_id,
      role_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
