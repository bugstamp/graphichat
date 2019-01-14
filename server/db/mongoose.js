import mongoose from 'mongoose';

mongoose.Promise = Promise;

mongoose.connect('mongodb://admin:chtkll2018@ds013475.mlab.com:13475/chatkilla', {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  if (err) {
    console.log('Couldn\'t connected to db', err);
  }
  console.log('Connected to db');
});

export default mongoose;
