const User = require("../schema/userSchema");

module.exports = (passport) => {
    passport.use(User.createStrategy());
}