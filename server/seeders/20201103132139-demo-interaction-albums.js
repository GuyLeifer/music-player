'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InteractionAlbums', [
      {
        userId: 1,
        albumId: 1,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        albumId: 2,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        albumId: 3,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        albumId: 4,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        albumId: 1,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        albumId: 2,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        albumId: 3,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        albumId: 4,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        albumId: 2,
        isLiked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('InteractionAlbums', null, {});
  }
};