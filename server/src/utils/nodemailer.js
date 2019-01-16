import { createTransport } from 'nodemailer';

const EMAIL_HOST = 'smtp.gmail.com';
const EMAIL_PORT = 587;
const EMAIL_ADRRESS = 'chatkilla2018@gmail.com';
const EMAIL_PASSWORD = 'chtkll2018';

const transporter = createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_ADRRESS,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmailVerification = async (email, registerToken) => {
  try {
    const mailOptions = {
      from: EMAIL_ADRRESS,
      to: email,
      subject: 'Go to the link for confirm registration!',
      text: `http://localhost:3000/verification/${registerToken}`,
    };
    const result = await transporter.sendMail(mailOptions);

    return result;
  } catch (err) {
    throw err;
  }
};

export default ({ sendEmailVerification });
