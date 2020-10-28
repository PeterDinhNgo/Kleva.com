const express = require('express');

// Controllers
const classroomController = require('../controllers/classrooms');

const router = express.Router();

// Teacher Routes
router.get('/teacher-dashboard', classroomController.getTeacherDashboard);

router.post('/games-with-array', classroomController.postGamesWithArray);

router.post('/replace-classrooms', classroomController.postReplaceGames);

router.get(
  '/otherTeachers/:otherTeacherID&:teacherName',
  classroomController.getOtherTeacherInfo
);

router.get(
  '/teacher-game-storepage/',
  classroomController.getTeacherGameStorepage
);

router.get(
  '/teacher-game-storepage-schedule/',
  classroomController.getTeacherGameStorepageSchedule
);

router.get('/teacher-schedule', classroomController.getTeacherSchedule);

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

router.post('/add-game-schedule', classroomController.postAddGameSchedule);

router.post(
  '/game-schedule-upload',
  classroomController.postGameScheduleUpload
);

router.get('/user-profile', classroomController.getUserProfile);

router.get('/drawing-history', classroomController.getDrawingHistory);

router.get(
  '/teacher-game-storepage-recommendation',
  classroomController.getTeacherRecommendationGames
);

module.exports = router;
