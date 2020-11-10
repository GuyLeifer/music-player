'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {
        name: 'American Idiot',
        artistId: 1,
        coverImg: 'https://upload.wikimedia.org/wikipedia/en/e/ed/Green_Day_-_American_Idiot_album_cover.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Minutes to Midnight',
        artistId: 3,
        coverImg: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Minutes_to_Midnight_cover.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Father of All Motherfuckers',
        artistId: 1,
        coverImg: 'https://s3-us-west-1.amazonaws.com/static-spin-com/files/2020/02/69989279_10157590914134521_3911858824536915968_o-1580941206.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'מכאן ועד הנצח',
        artistId: 4,
        coverImg: 'https://i.ytimg.com/vi/NwDvbCkwGXo/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBPHrFL8o7GsLRROIxoFNPx-OtEhQ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
