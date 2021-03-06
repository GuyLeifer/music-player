'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      artistId: {
        type: Sequelize.INTEGER
      },
      albumId: {
        type: Sequelize.INTEGER
      },
      youtubeLink: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.STRING
      },
      trackNumber: {
        type: Sequelize.INTEGER
      },
      lyrics: {
        type: Sequelize.STRING(8000)
      },
      playCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Songs');
  }
};