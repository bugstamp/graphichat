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

const redirect = process.env.NODE_ENV === 'production' ? '/' : `${process.env.DEV_URL}/login`;
const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
}, callback));
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
}, callback));
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_APP_ID,
  clientSecret: process.env.GITHUB_APP_SECRET,
}, callback));

router.use(passport.initialize());

router.get('/api/passport/google/auth', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
  callbackURL: 'http://localhost:3000/api/passport/google/auth/callback',
}));
router.get('/api/passport/google/auth/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  callbackURL: 'http://localhost:3000/api/passport/google/auth/callback',
}),
(req, res) => {
  console.log(req);
  res.redirect('/');
});
router.get('/api/passport/facebook', passport.authenticate('facebook', { scope: ['profile'], session: false }));
router.get('/api/passport/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });
router.get('/api/passport/github', passport.authenticate('github', { scope: ['profile'], session: false }));
router.get('/api/passport/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    console.log(req.user)
    res.redirect('/');
  });

export default router;
