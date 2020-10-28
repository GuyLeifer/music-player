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
        coverImg: 'https://scontent.fhfa1-2.fna.fbcdn.net/v/t1.0-9/s960x960/29425596_10156399711017904_564418931020791808_o.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=g-aeFrlnI4oAX9c6nyl&_nc_oc=AQmDY5Mqyhk73ImysrVcduLLlATkhKUb-KUpZN6SdF7FkrJHmq5_h4_rv4c9MoiCYUc&_nc_ht=scontent.fhfa1-2.fna&tp=7&oh=9da612934ee1fafcb94e0f6857e9ff32&oe=5F8B0581',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eyal Golan',
        coverImg: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Eyal_golan_2011.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Artists', null, {});
  }
};
