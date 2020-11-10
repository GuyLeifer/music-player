'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InteractionArtists', [
      {
        userId: 1,
        artistId: 1,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        artistId: 2,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        artistId: 3,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        artistId: 4,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        artistId: 1,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        artistId: 4,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        artistId: 4,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        artistId: 2,
        isLiked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('InteractionArtists', null, {});
  }
};