import mongoose from 'mongoose';

import seedUsers from './seedUsers';

mongoose.Promise = Promise;

const { ObjectId } = mongoose.Types;
// eslint-disable-next-line
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, options);

    if (process.env.NODE_ENV === 'development') {
      seedUsers(mongoose);
    }
  } catch (e) {
    throw e;
  }
};

export default mongoose;
