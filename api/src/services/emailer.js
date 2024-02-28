const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv').config();

const createTransport = () => {
   const transport = nodemailer.createTransport({
      host: process.env.SERVER_MAIL,
      port: process.env.PORT_MAIL,
      secure: true,
      auth: {
         user: process.env.USER_MAIL,
         pass: process.env.PASS_MAIL
      },
      tls: {
         rejectUnauthorized: false
      }
   });

   return transport;
}

const sendMail = async (req, res, next) => {

   const {
      reconocido,
      reconocedor,
      correo
   } = req.body;

   const imgName = req.file.path;

   const transporter = createTransport();

   const email = await transporter.sendMail({
      from: "'Colgate Inspira' <colgateinspira@col1.co>",
      to: correo,
      // to: "programador2.kagencia@gmail.com",
      subject: "¡Felicitaciones! 🥳 Te han reconocido -  Colgate Inspira",
      html: `
         <html>
            <h3>Hola, <b>${reconocido}</b></h3>
            <p>Tu influencia nos llena de inspiración, para seguir creciendo y alcanzar los sueños</p>
            <p>Por eso, te envío este reconocimiento, ¡Felicitaciones!</p>
            <p><i>Att: ${reconocedor}</i></p>
         </html>
      `,
      attachments: [
         {
            filename: 'Mi reconocimineto.jpg',
            path: imgName
         }
      ]
   }, (err, info) => {
      if (err) {
         next(err);
      }
      else {
         console.log('enviado');
         res.send(true)
         next();
      }
   })
}

module.exports = sendMail;