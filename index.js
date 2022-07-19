const express = require('express')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const port = process.env.PORT
app.use(express.json())

app.post('/', (req, res) => {
    const {recipent,message,subject} = req.body
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });
      
      var mailOptions = {
        from: 'emmanuelezele1gmail.com',
        to: recipent,
        subject: subject,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(400).json({message:error.message})
        } else {
          console.log('Email sent: ' );
          res.status(200).json({message:"email sent"})
        }
      });

})

app.listen(port, () => {
    console.log(`nodemailerProject is listening at http://localhost:${port}`)
})