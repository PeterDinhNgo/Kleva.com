const express = require('express');

// Controllers
const classroomController = require('../controllers/classrooms');

////////////////////////////////////////////////////////////////////
const router = express.Router();

router.get('/teacher-dashboard', classroomController.getTeacherDashboard);

router.post('/add-classroom', classroomController.postAddClassroom);

router.get('/teacher-students', classroomController.getTeacherStudents);

router.get('/classroom/:classroomCode', classroomController.getClassroom);

router.post(
  '/classroom/:classroomCode/delete',
  classroomController.postDeleteClassroom
);

router.post('/create-questions', classroomController.postCreateQuestions);

module.exports = router;
