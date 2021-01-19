'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.InteractionSong, {
        foreignKey: 'userId'
      });
      this.hasMany(models.InteractionArtist, {
        foreignKey: 'userId'
      });
      this.hasMany(models.InteractionAlbum, {
        foreignKey: 'userId'
      });
      this.hasMany(models.InteractionPlaylist, {
        foreignKey: 'userId'
      });
      this.hasMany(models.Playlist, {
        foreignKey: 'userId'
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
    timestamps: true,
  });
  return User;
};