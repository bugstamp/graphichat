import mongoose from 'mongoose';

mongoose.Promise = Promise;

const { ObjectId } = mongoose.Types;
// eslint-disable-next-line
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const uri = process.env.MONGOLAB_URI;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

export const connectToDb = async () => {
  try {
    return await mongoose.connect(uri, options);
  } catch (e) {
    throw e;
  }
};

export default mongoose;
