'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Team = this.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'team'
      });
    }
  }
  Task.init({
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};