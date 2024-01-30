'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          body: 'soccer',
          deadline: '2024-05-01',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          body: 'movie night',
          deadline: '2024-03-01',
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          body: 'hiking',
          deadline: '2024-08-01',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          
        },
        {
          body: 'hiking',
          deadline: '2024-08-01',
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
          
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};


// here we are usind undescroed in the model, and we need replace camelcase - created_at to _ - created_at