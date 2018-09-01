var nodemailer = require('nodemailer');

exports.config = nodemailer.createTransport({
    //host: 'smtp.ethereal.email',
    //port: 587,
    //secure: false, // true for 465, false for other ports
    service: 'Gmail',
    auth: {
        user: 'jitteamproject@gmail.com',
        pass: 'orderingsystem'
    },
    tls: {
        rejectUnauthorized: false
    }
});