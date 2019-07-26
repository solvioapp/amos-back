const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

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
    }

}

return module.exports;
