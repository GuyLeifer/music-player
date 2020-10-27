'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Song.init({
    title: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    youtubeLink: DataTypes.STRING,
    length: DataTypes.STRING,
    trackNumber: DataTypes.INTEGER,
    lyrics: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};