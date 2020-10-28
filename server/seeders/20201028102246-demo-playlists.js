'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Playlists', [
      {
        name: 'Rock',
        coverImg: 'https://cdn4.vectorstock.com/i/1000x1000/17/23/lets-rock-music-print-graphic-design-with-guitar-vector-23381723.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rock_2',
        coverImg: 'https://cdn1.vectorstock.com/i/1000x1000/18/00/lets-rock-music-print-graphic-design-with-guitar-vector-23381800.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Random Songs',
        coverImg: 'https://upload.wikimedia.org/wikipedia/he/thumb/6/67/Sixteenth_notes_joined_01.svg/200px-Sixteenth_notes_joined_01.svg.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Playlists', null, {});
  }
};
