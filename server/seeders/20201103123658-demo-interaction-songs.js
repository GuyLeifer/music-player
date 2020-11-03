'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InteractionSongs', [
      {
        userId: 1,
        songId: 3,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        songId: 6,
        isLiked: true,
        playCount: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        songId: 10,
        isLiked: true,
        playCount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        songId: 20,
        isLiked: true,
        playCount: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        songId: 3,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        songId: 7,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        songId: 15,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        songId: 4,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        songId: 6,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        songId: 3,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        songId: 2,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        songId: 1,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        songId: 8,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('InteractionSongs', null, {});
  }
};