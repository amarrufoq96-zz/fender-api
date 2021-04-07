/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
const nodemailer = require('nodemailer');
const template = require('./template');

const env = process.env.NODE_ENV || 'development';

const sendEmailProduction = async (parameters) => {
    const transporter = nodemailer.createTransport({
        host: process.env.AWS_SMTP_SERVER,
        port: process.env.AWS_SMTP_PORT,
        pool: true,
        rateDelta: 1000,
        maxConnections: 3,
        auth: {
            user: process.env.AWS_SMTP_USERNAME,
            pass: process.env.AWS_SMTP_PASSWORD,
        },
        secureConnection: false,
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false,
        },
    });
    return transporter.sendMail(parameters, (error, info) => {
        if (error) return console.log('Message sent errors: %s', error);
        console.log('Message sent: %s', info.response);
    });
};

const sendEmailDevelopment = async (parameters) => {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    return transporter.sendMail(parameters, (error, info) => {
        if (error) return console.log('Message sent errors: %s', error);
        console.log('Message sent: %s', info.response);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};

const sendEmail = async (parameters) => {
    parameters.to = parameters.to || '';
    parameters.subject = parameters.subject || '';
    parameters.title = parameters.title || '';
    parameters.text = parameters.text || '';
    parameters.from = parameters.from || 'BASE <masanchez@compusoluciones.com>';
    parameters.bcc = [{ name: 'Mauro, Sánchez', address: 'masanchez@compusoluciones.com' }];
    const html = template(parameters);
    parameters.html = parameters.html || html;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    if (env === 'production') return await sendEmailProduction(parameters);
    if (env === 'sandbox') return await sendEmailDevelopment(parameters);
    if (env === 'development') return await sendEmailDevelopment(parameters);
};

module.exports = { sendEmail };
