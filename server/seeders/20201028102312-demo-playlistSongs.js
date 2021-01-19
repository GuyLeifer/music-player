'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PlaylistSongs', [
      {
        id: 1,
        playlistId: 1,
        songId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        playlistId: 1,
        songId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        playlistId: 1,
        songId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        playlistId: 2,
        songId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        playlistId: 2,
        songId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        playlistId: 2,
        songId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        playlistId: 3,
        songId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        playlistId: 3,
        songId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        playlistId: 3,
        songId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        playlistId: 3,
        songId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        playlistId: 3,
        songId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        playlistId: 3,
        songId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        playlistId: 3,
        songId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        playlistId: 3,
        songId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        playlistId: 3,
        songId: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        playlistId: 3,
        songId: 21,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        playlistId: 3,
        songId: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        playlistId: 3,
        songId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        playlistId: 3,
        songId: 21,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};
