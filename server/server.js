require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const app = express();

let User = require("./schema/userSchema");

// express session
app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
  })
);

// database connection
const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("connected to database");
  } catch (err) {
    console.log(err.message);
  }
};
databaseConnection();

// passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// local passport strategy
require("./passport/localPassport")(passport);

// google passport strategy
const google = require("./passport/googlePassport");
google.googlePassport(passport);
google.googleRoutes(app);

// facebook passport strategy
const facebook = require("./passport/facebookPassport");
facebook.facebookPassport(passport);
facebook.facebookRoutes(app);

// jwt passport strategy
require("./passport/jwtPassport")(passport);

// body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
require("./routes/routes.js")(app);

let PORT = process.env.PORT || 3001;
app.listen(PORT, (err) => {
  if (err) console.log(err.message);
  console.log(`listening on port ${PORT}`);
});
