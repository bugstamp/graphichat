import express from 'express';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import passportFacebook from 'passport-facebook';
import passportGithub from 'passport-github';

// import db from '../db';

const router = express.Router();
const GoogleStrategy = passportGoogle.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const GitHubStrategy = passportGithub.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI,
},
(accessToken, refreshToken, profile, cb) => {
  cb(null, profile);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_REDIRECT_URI,
},
(accessToken, refreshToken, profile, cb) => {
  cb(null, profile);
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_APP_ID,
  clientSecret: process.env.GITHUB_APP_SECRET,
  callbackURL: process.env.GITHUB_REDIRECT_URI,
},
(accessToken, refreshToken, profile, cb) => {
  cb(null, profile);
}));

router.use(passport.initialize());

router.get('/passport/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/passport/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log(req.user)
    res.redirect('/');
  });
router.get('/passport/facebook', passport.authenticate('facebook', { scope: ['profile'], session: false }));
router.get('/passport/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });
router.get('/passport/github', passport.authenticate('github', { scope: ['profile'], session: false }));
router.get('/passport/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    console.log(req.user)
    res.redirect('/');
  });

export default router;
