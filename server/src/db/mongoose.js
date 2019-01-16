import mongoose from 'mongoose';

const uri = process.env.MONGOLAB_URI;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.Promise = Promise;
mongoose.connect(uri, options, (err) => {
  if (err) {
    console.log('Couldn\'t connected to db', err);
  }
  console.log('Connected to db');
});

export default mongoose;
