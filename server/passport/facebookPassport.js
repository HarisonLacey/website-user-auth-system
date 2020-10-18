const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../schema/userSchema");
const passport = require("passport");

module.exports.facebookPassport = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "http://localhost:3001/auth/facebook/callback",
      },
      (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate(
          { fullName: profile.displayName, facebookId: profile.id, thirdParty: true },
          (err, user) => {
            return cb(err, user);
          }
        );
      }
    )
  );
};

module.exports.facebookRoutes = (app) => {
  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "http://localhost:3000",
    }),
    (req, res) => {
      res.redirect("http://localhost:3000/redirect");
    }
  );
};