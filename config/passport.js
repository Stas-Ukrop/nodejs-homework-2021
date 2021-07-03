const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const User = require("../repositories/user");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    try {
      const user = await User.findByID(payload.id);
      if (!user) {
        return done(new Error("User not Found"));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(err, false);
    }
  })
);
