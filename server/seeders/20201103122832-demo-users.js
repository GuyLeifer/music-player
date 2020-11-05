'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: "Guy Leifer",
        email: "guylei7@gmail.com",
        password: "12345678",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Itai Leifer",
        email: "itailei7@gmail.com",
        password: "12345678",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Yuval Leifer",
        email: "yuvalei7@gmail.com",
        password: "12345678",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ] , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
