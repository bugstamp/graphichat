import mongoose from 'mongoose';

mongoose.Promise = Promise;

const { ObjectId } = mongoose.Types;
// eslint-disable-next-line
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

// const uri = process.env.NODE_ENV === 'production'
//   ? process.env.MONGOLAB_URI
//   : 'mongodb://localhost/graphichat';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOLAB_URI, options);
  } catch (e) {
    throw e;
  }
};

export default mongoose;
