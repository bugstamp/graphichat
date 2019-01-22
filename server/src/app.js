import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import passportGoogleOauth20 from 'passport-google-oauth20';
import paths from '../../paths';

import db from './db';
import typeDefs from './schemas';
import resolvers from './resolvers';
import middlewares from './middlewares';

const {
  tokenVerification,
  emailVerification,
  oauth2,
} = middlewares;

const GoogleStrategy = passportGoogleOauth20.Strategy;

const app = express();
const port = process.env.PORT;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log(req.user);
    return {
      db,
      user: req.user,
    };
  },
});
server.applyMiddleware({ app });

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

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

app.use(express.static(paths.public));
app.use(passport.initialize());
app.use(tokenVerification);

app.get('/passport/google', passport.authenticate('google', { scope: ['profile'], session: false }));
app.get('/passport/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });
app.get('/verification/:regToken', emailVerification);
app.get('*', (req, res) => {
  res.sendFile(paths.html);
});

app.listen({ port }, () => {
  console.log(`Server is listening on port - ${port}`);
});
