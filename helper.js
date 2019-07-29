const bcrypt = require('bcryptjs');
const saltRounds = 10;
var utils = require('./utils');
const path = require('path');

const neode = require('neode')
    .fromEnv()
    .withDirectory(path.join(__dirname, 'models'));

module.exports = {

    sendResponse: function(responseData, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(responseData));
        return true
    },

    checkAuth: function (req, res, next) {
        try {
            if ('authorization' in req.headers && req.headers.authorization.length > 0) {
                utils.verifyAuthToken(req.headers.authorization, function (authErr, authorised) {
                    if(authErr) {
                        console.log('authErr:', authErr);
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
        } catch (e) {
            console.log('error in checkAuth:', e);
            module.exports.sendResponse({
                'success': false,
                'statusCode': 401,
                'data': null,
                'errors': 'Access Error',
                'message': 'Something went wrong. Please try again later!'
            }, res)
        }
    },

    checkAccess: function (req, res, next) {
        try {
            let responseData = null;
            // fetch user data.
            neode.first('User', 'id', req.authorised)
            .then(user => {
                if (user.get('role') && user.get('role') == 'admin') {
                    next();
                }
                else {
                    module.exports.sendResponse({
                        'success': false,
                        'statusCode': 401,
                        'data': null,
                        'errors': 'Access Restricted',
                        'message': 'You do not have required access for this endpoint. If you think this is a mistake please connect with admin at hello@solvio.org!'
                    }, res)
                }
            })
            .catch(() => {
                module.exports.sendResponse({
                    'success': true,
                    'statusCode': 400,
                    'data': null,
                    'errors': 'User not found!',
                    'message': 'Something went wrong while trying to fetch User! Please re-login if this issue persists!'
                }, res)
            })
        } catch (e) {
            console.log('e:', e);
            module.exports.sendResponse({
                'success': false,
                'statusCode': 401,
                'data': null,
                'errors': e,
                'message': 'Something went wrong while checking your access to this endpoint. Please try again later!'
            }, res)
        }
    },

}

return module.exports;
