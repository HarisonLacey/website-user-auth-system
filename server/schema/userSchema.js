const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
var findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  googleId: String,
  facebookId: String, 
  email: Array,
  password: String,
  reset_token: String,
  thirdParty: Boolean
});

const options = {
  errorMessages: {
    MissingPasswordError: "No password was given",
    AttemptTooSoonError: "Account is currently locked. Try again later",
    TooManyAttemptsError:
      "Account locked due to too many failed login attempts",
    NoSaltValueStoredError: "Authentication not possible. No salt value stored",
    IncorrectPasswordError: "Password or username are incorrect",
    IncorrectUsernameError: "Password or username are incorrect",
    MissingUsernameError: "No username was given",
    UserExistsError: "A user with the given email already exists",
  },
};

User.plugin(passportLocalMongoose, { usernameField: "email", errorMessages: options.errorMessages } );
User.plugin(findOrCreate);

module.exports = mongoose.model("users", User);
