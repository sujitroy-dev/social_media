import express from "express";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Config
const config = { secretOrKey: process.env.JWT_SECRET_KEY };

// Middlewares
app.use(passport.initialize());

// Utility functions for checking if a user exists in the DATA array - Note: DATA array is flushed after every restart of server
// TODO:
// create this utils with mysql (same logic)
function FindOrCreate(user) {
  if (CheckUser(user)) {
    // if user exists then return user
    return user;
  } else {
    DATA.push(user); // else create a new user
  }
}
// TODO:
// create the same with mysql (same logic)
function CheckUser(input) {
  for (var i in DATA) {
    if (
      input.email == DATA[i].email &&
      (input.password == DATA[i].password || DATA[i].provider == input.provider)
    )
      return true; // found
    else null; //console.log('no match')
  }
  return false; // not found
}

var opts = {};
opts.jwtFromRequest = function (req) {
  // tell passport to read JWT(token) from cookies
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};
opts.secretOrKey = config.secretOrKey;

// main authentication, our app will rely on it
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // called everytime a protected URL is being served
    if (CheckUser(jwt_payload.data)) {
      return done(null, jwt_payload.data);
    } else {
      // user account doesnt exists in the DATA
      return done(null, false);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, { ...profile, accessToken });
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/auth/github/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, { ...profile, accessToken });
    }
  )
);

// These functions are required for getting data To/from JSON returned from Providers
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
