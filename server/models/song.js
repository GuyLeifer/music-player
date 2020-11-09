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
      this.belongsTo(models.Artist);
      this.belongsTo(models.Album);
      this.hasMany(models.PlaylistSongs, {
        foreignKey: 'songId'
      });
      this.hasMany(models.InteractionSong, {
        foreignKey: 'songId'
      });
    }
  };
  Song.init({
    title: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    youtubeLink: DataTypes.STRING(8000),
    length: DataTypes.STRING,
    trackNumber: DataTypes.INTEGER,
    lyrics: DataTypes.STRING(8000),
    playCount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};