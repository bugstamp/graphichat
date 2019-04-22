import mongoose from 'mongoose';

const uri = process.env.MONGOLAB_URI;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

mongoose.Promise = Promise;
mongoose.connect(uri, options, (err) => {
  if (err) {
    console.log('Couldn\'t connected to db', err);
  }
  console.log('Connected to db');
});

export default mongoose;
