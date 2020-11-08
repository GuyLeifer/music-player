'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.PlaylistSongs, {
        foreignKey: 'playlistId'
      });
      this.belongsTo(models.User);
    }
  };
  Playlist.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    coverImg: DataTypes.STRING(8000)
  }, {
    sequelize,
    modelName: 'Playlist',
    paranoid: true,
    timestamps: true,
  });
  return Playlist;
};