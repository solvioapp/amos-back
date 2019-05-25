const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    encrypt: function(password, cb) {
        console.log('password:', password);
        bcrypt.hash(password, saltRounds, function(err, hash) {
            cb(err, hash);
        });
    }

}

return module.exports;
