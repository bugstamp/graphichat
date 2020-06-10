import mongoose from 'mongoose';

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
          const { _id: adminUserId, displayName } = await mongoose.models.User.create({
            username: 'admin',
            email: 'graphichat2019@gmail.com',
            password: '123456',
            firstName: 'Admin',
            lastName: 'Graphichat',
            gender: 'male',
            regStatus: 'COMPLETED',
          });
          const chat = await mongoose.models.Chat.createChat(adminUserId, testUserId, displayName);
          const { id: chatId } = chat;
          await mongoose.models.User.addContact(adminUserId, testUserId, chatId);
          await mongoose.models.User.addContact(testUserId, adminUserId, chatId);
          chat.messages.push({
            $each: Array.from({ length: 100 }, () => ({
              senderId: testUserId,
              content: 'Test Message',
              time: Date.now() + 1000,
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
