'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InteractionSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Song);
    }
  };
  InteractionSong.init({
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    isLiked: DataTypes.BOOLEAN,
    playCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InteractionSong',
  });
  return InteractionSong;
};