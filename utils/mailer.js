const nodeMailer = require("nodemailer");

module.exports.mailer = async function main(data) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'victorshkoda@gmail.com',
            pass: 'kxt287777'
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        to: 'victorshkoda@mail.ru',
        subject: "test",
        html: `<b>Hello ${data.firstname} ${data.lastname}</b>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};
