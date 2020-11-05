'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: [true, 'Please enter a valid email address'],
        unique: [true, 'The user is already a member']
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        minLength: [6, 'Minimum password length is 6 characters']
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      preferences: {
        type: Sequelize.JSON
      },
      rememberToken: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};