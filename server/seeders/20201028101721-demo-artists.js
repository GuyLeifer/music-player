'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Artists', [
      {
        name: 'Green Day',
        coverImg: 'https://i.pinimg.com/originals/88/03/d7/8803d7ec675006ca7c23d244b7ff0104.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coldplay',
        coverImg: 'https://www.eventim.co.il/obj/media/IL-eventim/galery/222x222/c/coldplay-tickets.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Linkin Park',
        coverImg: 'https://lezebre.lu/images/detailed/14/17536-linkin-park-logo.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eyal Golan',
        coverImg: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Eyal_golan_2011.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Itay Levi',
        coverImg: 'https://www.yeruham.org.il/productImages2/14/2017/07/24/image1500885358.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Artists', null, {});
  }
};
