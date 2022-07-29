import nodemailer from 'nodemailer';
import { EmailConfig } from './config.js';

export function SendEmail (title, content) {
    var transporter = nodemailer.createTransport({
        service: EmailConfig.service,
        auth: {
          user: EmailConfig.address,
          pass: EmailConfig.password,
        }
      });
      
      var mailOptions = {
        from: EmailConfig.address,
        to: EmailConfig.address,
        subject: title,
        text: content
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}