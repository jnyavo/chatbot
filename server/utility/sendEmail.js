const nodemailer = require("nodemailer");
require("dotenv").config();
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "contact.dodoc@gmail.com",
    pass: process.env.EMAIL_APP_MDP,
  },
});

exports.sendEmail = async (email, link) => {
  try {
    let mailOptions = {
      from: "contact.dodoc@gmail.com",
      to: email,
      subject: "Reset password",
      text: link,
    };
    const response = await mailTransporter.sendMail(mailOptions, await function (
      error,
      info
    ) {
      if (error) {
        console.log(error);
        return null;
      } else {
        console.log("success" + info.response);
        return " success" + info.response;
      }
    });
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};
