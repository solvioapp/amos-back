const bcrypt = require('bcryptjs');
const saltRounds = 10;
var utils = require('./utils');

module.exports = {

    sendResponse: function(responseData, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(responseData));
        return true
    },

    checkAuth: function (req, res, next) {
        if ('authorization' in req.headers && req.headers.authorization.length > 0) {
            utils.verifyAuthToken(req.headers.authorization, function (authErr, authorised) {
                if(authErr) {
                    module.exports.sendResponse({
                        'success': false,
                        'statusCode': 401,
                        'data': null,
                        'errors': authErr,
                        'message': 'Unauthorized User!'
                    }, res)
                }
                else {
                    req.authorised = authorised;
                    next();
                }
            })
        }
        else {
            module.exports.sendResponse({
                'success': false,
                'statusCode': 401,
                'data': null,
                'errors': 'No Auth Token Found',
                'message': 'Please Login to continue!'
            }, res)
        }
    }

}

return module.exports;
