'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InteractionAlbums', [
      {
        id: 1,
        userId: 1,
        albumId: 1,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        albumId: 2,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 1,
        albumId: 3,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId: 1,
        albumId: 4,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        userId: 2,
        albumId: 1,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        userId: 2,
        albumId: 2,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        userId: 2,
        albumId: 3,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        userId: 3,
        albumId: 4,
        isLiked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
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