const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../schema/userSchema");
const passport = require("passport");

module.exports.googlePassport = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:3001/auth/google/callback",
      },
      (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate(
          { fullName: profile.displayName, googleId: profile.id, email: profile.emails, thirdParty: true },
          (err, user) => {
            return cb(err, user);
          }
        );
      }
    )
  );
};

module.exports.googleRoutes = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "http://localhost:3000",
    }),
    (req, res) => {
      res.redirect("http://localhost:3000/redirect");
    }
  );
}