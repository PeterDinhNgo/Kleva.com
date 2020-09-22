const path = require("path");
const express = require("express");

// Server-side cookies for login persistence.
const session = require("express-session");

// 3rd Party Middlewares
const bodyParser = require("body-parser");


// Routes
const storeRoutes = require("./routes/store");
const authenticatedRoutes = require("./routes/authenticated");
const teacherRoutes = require("./routes/teacher");
const creatorRoutes = require("./routes/creator");

// Controllers
const notFoundController = require("./controllers/404");

// Sequelize ORM for PostgreSQL
const sequelize = require("./data/database");

// Models (Tables in Database)
const Teacher = require("./models/teacher");
const Classroom = require("./models/classroom");
const Creator = require("./models/creator");
const Game = require("./models/game");
const Student = require("./models/student");
const Session = require("./models/session");

// Session Storage on PostgreSQL Database with Sequelize ORM
var SequelizeStore = require("connect-session-sequelize")(session.Store);

///////////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 3000;

const app = express();

//////////////////////////////////////////////////////////////////////////

// Sessions

// Use the Session Model For Session Storage
var myStore = new SequelizeStore({
  db: sequelize,
  table: "Session",
});

// Create a new session for each new visitor on the website.
app.use(
  session({
    secret: "kleva user session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 Days
      httpOnly: false,
    },
    store: myStore,
    proxy: true,
  })
);

////////////////////////////////////////////////////////////////////////////

// Front End Framework
app.set("view engine", "ejs"); // EJS
app.set("views", "views"); // Views in the Views Folder

// //Serve bootstrap Statically
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

// //Serve jquery Statically
app.use(express.static(__dirname + "/node_modules/jquery/dist"));

// Serve CSS Statically
app.use(express.static(path.join(__dirname, "public")));

///////////////////////////////////////////////////////////////////////////

// Useful Extra Tools

app.use(bodyParser.urlencoded({ extended: false })); // Read request bodies


//////////////////////////////////////////////////////////////////////////

// Routing

app.use(storeRoutes); // Mount the store routes on the app.
app.use(teacherRoutes); // Mount the teacher routes on the app.
app.use(authenticatedRoutes); // Mount the authenticated routes on the app.
app.use("/creator-dashboard", creatorRoutes);

////////////////////////////////////////////////////////////////////////////

// 404 Page for Invalid HTTP Paths
app.use(notFoundController.get404);

////////////////////////////////////////////////////////////////////////////

// Relations for Postgres using Sequelize

Game.belongsTo(Creator, {
  // Each Game belongs to a Creator.
  constraints: true,
  onDelete: "CASCADE",
});

Creator.hasMany(Game); // Each Creator has many Games.

Classroom.belongsTo(Teacher, {
  // Each Classroom belongs to a Teacher.
  constraints: true,
  onDelete: "CASCADE",
});

Teacher.hasMany(Classroom); // Each Teacher has many Classrooms.

// TODO FOR SPRINT 4

////////////////////////////////////////////////////////////////////////////

// Sync the Tables/Models and Relations
sequelize
  .sync()
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
