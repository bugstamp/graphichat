import mongoose from 'mongoose';
import moment from 'moment';

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
      mongoose.connection.db.collection('users').countDocuments(async (err, count) => {
        if (!count) {
          mongoose.connection.db.dropDatabase();

          const { _id: testUserId } = await mongoose.models.User.create({
            username: 'test',
            email: 'test@gmail.com',
            password: '123456',
            firstName: 'Test',
            lastName: 'Test',
            gender: 'male',
            regStatus: 'COMPLETED',
          });
          Array.from({ length: 10 }, async (u, i) => {
            const index = i + 1;

            await mongoose.models.User.create({
              username: `test${index}`,
              email: `test${index}@gmail.com`,
              password: '123456',
              firstName: 'Test',
              lastName: `${index}`,
              gender: 'male',
              regStatus: 'COMPLETED',
            });
          });
          const { _id: adminUserId, displayName } = await mongoose.models.User.create({
            username: 'admin',
            email: 'graphichat2019@gmail.com',
            password: '123456',
            firstName: 'Admin',
            lastName: 'Graphichat',
            gender: 'male',
            regStatus: 'COMPLETED',
          });
          const createDate = moment().subtract(2, 'month').toDate();
          const chat = await mongoose.models.Chat
            .createChat(adminUserId, testUserId, displayName, createDate);
          const { id: chatId } = chat;
          await mongoose.models.User.addContact(adminUserId, testUserId, chatId);
          await mongoose.models.User.addContact(testUserId, adminUserId, chatId);
          chat.messages.push({
            $each: Array.from({ length: 1000 }, (m, index) => ({
              senderId: testUserId,
              content: 'Test Message',
              time: moment(createDate).add(index + 1, 'hour').toDate(),
            })),
          });
          await chat.save();
        }
      });
    }
  } catch (e) {
    throw e;
  }
};

export default mongoose;
