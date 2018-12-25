import mongoose from 'mongoose';

mongoose.Promise = Promise;

const connection = () => {
  mongoose.connect('mongodb://admin:chatzilla$11@ds243054.mlab.com:43054/chatzilla', {
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (err) => {
    if (err) {
      console.log('Couldn\'t connected to db', err);
    }
    console.log('Connected to db');
  });
};

export default connection;
