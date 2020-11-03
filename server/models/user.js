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
        foreignKey: 'songId'
      });
      this.hasMany(models.InteractionArtist, {
        foreignKey: 'artistId'
      });
      this.hasMany(models.InteractionAlbum, {
        foreignKey: 'albumId'
      });
      this.hasMany(models.InteractionPlaylist, {
        foreignKey: 'playlistId'
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    preferences: DataTypes.JSON,
    rememberToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};