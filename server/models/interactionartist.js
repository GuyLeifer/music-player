'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InteractionArtist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Artist);
    }
  };
  InteractionArtist.init({
    userId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    isLiked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'InteractionArtist',
  });
  return InteractionArtist;
};