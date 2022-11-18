const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.sendgridAPI);

const sendEmailpass = (link, toEmail) => {


    const msg = {
        to: `${toEmail}`,
        from: `${process.env.fromEmail}`,
        subject: 'Restaurar contraseña',
        text: `Restaurar contraseña ${link}`,
        html: `<h1>Restaurar contraseña ${link} </h1>`,
      };

    sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);
 
    if (error.response) {
      console.error(error.response.body)
    }
  });
}



module.exports = sendEmailpass;