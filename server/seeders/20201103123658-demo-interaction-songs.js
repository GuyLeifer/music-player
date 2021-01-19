'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InteractionSongs', [
      {
        id: 1,
        userId: 1,
        songId: 3,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        songId: 6,
        isLiked: true,
        playCount: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 1,
        songId: 10,
        isLiked: true,
        playCount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId: 1,
        songId: 20,
        isLiked: true,
        playCount: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        userId: 2,
        songId: 3,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        userId: 2,
        songId: 7,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        userId: 2,
        songId: 15,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        userId: 2,
        songId: 4,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        userId: 2,
        songId: 6,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        userId: 3,
        songId: 3,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        userId: 3,
        songId: 2,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        userId: 3,
        songId: 1,
        isLiked: true,
        playCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
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