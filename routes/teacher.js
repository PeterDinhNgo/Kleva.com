const express = require('express');

// Controllers
const classroomController = require('../controllers/classrooms');

////////////////////////////////////////////////////////////////////
const router = express.Router();

router.get('/teacher-dashboard', classroomController.getTeacherDashboard);

router.get('/teacher-game-storepage/:classroomCode', classroomController.getTeacherGameStorepage);

router.post('/add-classroom', classroomController.postAddClassroom);

router.get('/teacher-students', classroomController.getTeacherStudents);

router.get('/classroom/:classroomCode', classroomController.getClassroom);

router.get('/user-profile', classroomController.getUserProfile);

router.post(
  '/classroom/:classroomCode/delete',
  classroomController.postDeleteClassroom
);

router.post('/create-questions', classroomController.postCreateQuestions);

router.post('/add-game', classroomController.postAddGame);

router.get('/user-profile', classroomController.getUserProfile);

module.exports = router;
