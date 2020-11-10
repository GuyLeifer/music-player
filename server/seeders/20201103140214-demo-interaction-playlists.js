'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InteractionPlaylists', [
      {
        userId: 1,
        playlistId: 1,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        playlistId: 2,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        playlistId: 3,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        playlistId: 2,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        playlistId: 3,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('InteractionPlaylists', null, {});
  }
};