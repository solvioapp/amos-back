const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    sendResponse: function(responseData, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(responseData));
        return true
    },

}

return module.exports;
