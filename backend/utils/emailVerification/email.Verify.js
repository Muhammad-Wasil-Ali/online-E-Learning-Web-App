import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, emailMessage) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: `${process.env.Email}`,
      pass: `${process.env.Email_Password}`,
    },
  });

  //mailOPtions
  const mailOptions = {
    from: process.env.Email,
    to: email,
    subject: subject,
    text: emailMessage,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info);
  } catch (error) {
    console.log(error);
  }
};

// async..await is not allowed in global scope, must use a wrapper

// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
