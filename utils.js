const bcrypt = require('bcryptjs');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var aws = require('aws-sdk');

aws.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: ''
});

module.exports = {

    encrypt: function(password, cb) {
        console.log('password:', password);
        bcrypt.hash(password, saltRounds, function(err, hash) {
            cb(err, hash);
        });
    },

    passwordCheck: function(password, hash, cb) {
        bcrypt.compare(password, hash, function(err, res) {
            if (err) {
                cb(err)
            } else {
                cb(null, res)
            }
        });
    },

    generateAuthToken: function(data, cb) {
        try {
            let secretKey = process.env.SECRET_KEY || ''
            let expiryTime = process.env.EXPIRY_TIME || 262068185400
            var token = jwt.sign({
                exp: expiryTime,
                data: data
            }, secretKey);
            cb(null, token)
        } catch (err) {
            cb(err)
        }
    },

    verifyAuthToken: function(token, cb) {
        try {
            let secretKey = process.env.SECRET_KEY || ''
            var decoded = jwt.verify(token, secretKey);
            cb(null, decoded.data)
        } catch (err) {
            cb(err)
        }
    },

    sendEmail: function () {
        try {
            // create Nodemailer SES transporter
            let transporter = nodemailer.createTransport({
                SES: new aws.SES({
                    apiVersion: '2010-12-01'
                })
            });

            // send some mail
            transporter.sendMail({
                from: 'sender@example.com',
                to: 'recipient@example.com',
                subject: 'Message',
                text: 'I hope this message gets sent!',
                ses: {
                    Tags: [{
                        Name: 'tag name',
                        Value: 'tag value'
                    }]
                }
            }, (err, info) => {
                console.log(info.envelope);
                console.log(info.messageId);
            });
        } catch (e) {
            console.log('err in sending mail:', e);
        }
    }

}

return module.exports;
