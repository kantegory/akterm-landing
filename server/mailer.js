const nodemailer = require('nodemailer');
const conf = require('ini');
const fs = require('fs');

let config = conf.parse(fs.readFileSync('config/config.ini', 'utf-8'));

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: '465',
  auth: {
    user: config.mailer.user,
    pass: config.mailer.pass
  }
});

const sendMsg = (msg) => {
  const mailOptions = {
    from: config.mailer.user,
    to: config.mailer.dest,
    subject: config.mailer.subject,
    text: msg
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMsg;
