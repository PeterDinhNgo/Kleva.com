// Dependencies
const Sequelize = require('sequelize');
const sequelize = require('../data/database');

// Game Model
const Game = sequelize.define(
  'games',
  {
    gameID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subCategory: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    description: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    gameFileURL: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gameImageURL: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Game;
