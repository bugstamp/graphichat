import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_ADRRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmailVerification = async (email, registerToken) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ADRRESS,
      to: email,
      subject: 'Go to the link for confirm registration.',
      text: `${process.env.API_URL}/verification/${registerToken}`,
    };
    const result = await transporter.sendMail(mailOptions);

    return result;
  } catch (err) {
    throw err;
  }
};

export default ({ sendEmailVerification });
