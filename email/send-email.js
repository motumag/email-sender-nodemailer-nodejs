var nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

router.post("/email", async (req, res, next) => {
  // console.log(req.body);
  // try {
  const fromemail = req.body.sender_email;
  const toemail = req.body.reciever_email;
  const subject = req.body.subject;
  const message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.myemail,
      pass: process.env.password,
    },
  });

  var mailOptions = {
    from: fromemail,
    to: toemail,
    subject: subject,
    text: message,
  };

  // console.log(mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
      res.sendStatus(500);
    } else {
      console.log("Email has sent to:" + info.response);
      res.sendStatus(200);
    }
  });

  //   const es = transporter.sendMail(mailOptions).then(() => {
  //     res.json({ message: "email sent successfully" });
  //   });
  // } catch (error) {
  //   console.log(error);

  // }
});

module.exports = router;
