'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PlaylistSongs', [
      {
        playlistId: 1,
        songId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 1,
        songId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 1,
        songId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 2,
        songId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 2,
        songId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 2,
        songId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 21,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        songId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
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
