import passportGoogleOauth20 from 'passport-google-oauth20';

const GoogleStrategy = passportGoogleOauth20.Strategy;

export default (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    cb(null, {
      profile,
      accessToken,
      refreshToken,
    });
  }));
};
