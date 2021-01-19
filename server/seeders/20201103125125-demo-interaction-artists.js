'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InteractionArtists', [
      {
        id: 1,
        userId: 1,
        artistId: 1,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        artistId: 2,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 1,
        artistId: 3,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId: 1,
        artistId: 4,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        userId: 2,
        artistId: 1,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        userId: 2,
        artistId: 4,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        userId: 3,
        artistId: 4,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
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