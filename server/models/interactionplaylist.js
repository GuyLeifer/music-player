'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InteractionPlaylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Playlist);
    }
  };
  InteractionPlaylist.init({
    userId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    isLiked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'InteractionPlaylist',
    paranoid: true,
    timestamps: true,
  });
  return InteractionPlaylist;
};