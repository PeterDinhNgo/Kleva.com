const Classroom = require('../models/classroom');
const { v4: uuidv4 } = require('uuid');
const firebaseAdmin = require('../authentication/firebase');
const Teacher = require('../models/teacher');
const generate = require('nanoid-generate');
const dictionary = require('nanoid-dictionary');


exports.postAddClassroom = (req, res, next) => {
    const className = req.body.className
    const yearLevel = req.body.yearLevel
    const subject = req.body.subject
    // Easy to Remember Single Classcode Signon for High Schoolers
    const classCode = generate.english(8);
    
    Classroom.create({
        teacherID: req.session.user,
        classCode: classCode,
        subject: subject,
        yearLevel: yearLevel,
        title: className
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    }).then(() => {
        res.redirect('/teacher-dashboard')
    })
    
}

exports.getTeacherDashboard = (req, res, next) => {
    if(req.session.user){
        const email = req.session.user;
        // Also Search the Classroom Table with matching teacherID.
        Classroom.findAll({
            
            where: {
                teacherID: email
            },
            attributes: ['classCode', 'yearLevel', 'title', 'subject']
        }).then((classrooms) => {
            console.log(classrooms)
            Teacher.findOne({ where: {email: email } })
            .then(teacher => {
                res.render('teacher/teacher-dashboard', {
                    path: '/teacher-dashboard',
                    name: teacher.firstName,
                    classrooms: classrooms
                })  
            })
        })
        
    } else {
        res.redirect('/')
    }
}

exports.getTeacherStudents = (req, res, next) => {
    if(req.session.user){
        const email = req.session.user;
        // First find the teacherID from the teacher email on the Teacher Table.
        // Return all students from the Student Table with the matching teacherID.
        res.render('teacher/teacher-students', {
            path: '/teacher-students'
        })
    } else {
        res.redirect('/')
    }
}