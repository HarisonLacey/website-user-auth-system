const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../schema/userSchema");
const cookie = require("cookie");

// extract web token from cookie via request headers
const cookieExtractor = (req) => {
  if (req.headers.cookie) {
    let token = cookie.parse(req.headers.cookie);
    return token.the_sour_lemon;
  }
};

// jwt passport strategy
module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(
    new JwtStrategy(opts, async (jwt, done) => {
      try {
        let user = await User.findOne({ _id: jwt.id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
