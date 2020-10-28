// Dependencies
const Sequelize = require('sequelize');
const sequelize = require('../data/database');

// Classroom Statistics Model
const ClassroomStats = sequelize.define('classroomStats', {
  gameID: {
    //gameID and classroomClassCode make a composite primary key
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  classroomClassCode: {
    //gameID and classroomClassCode make a composite primary key
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  AverageStudentActivity: {
    type: Sequelize.INTEGER,
  },
  studentVisits: {
    type: Sequelize.INTEGER,
  },
});

module.exports = ClassroomStats;
