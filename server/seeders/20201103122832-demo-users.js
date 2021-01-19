'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: "Guy Leifer",
        email: "guylei7@gmail.com",
        password: "12345678",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Itai Leifer",
        email: "itailei7@gmail.com",
        password: "12345678",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Yuval Leifer",
        email: "yuvalei7@gmail.com",
        password: "12345678",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
