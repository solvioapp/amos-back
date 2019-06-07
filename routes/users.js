module.exports = function(neode) {
    const router = require('express').Router();
    var utils = require('../utils');
    var helper = require('../helper');

    router.post('/', function (req, res) {
        responseData = {}
        console.log('body:', req.body);
        utils.encrypt(req.body.password, function (err, password) {
            console.log('utils encrypt:', err, password);
            neode.create('User', {
                email: req.body.email,
                password: password
            })
            .then(userData => {
                console.log('New user with email:', userData.get('email'), 'is now registered on AMOS!');
                responseData = {
                    'success': true,
                    'statusCode': 201,
                    'data': {
                        'email': userData.get('email')
                    },
                    'errors': null,
                    'message': 'New user successfully registered!'
                }
                helper.sendResponse(responseData, res)
            });
        })
    })

    router.post('/login', function (req, res) {
        responseData = {}
        // Get User with req.body.email and passwordCheck
        neode.first('User', 'email', req.body.email)
        .then(user => {
            // Check Password
            utils.passwordCheck(req.body.password, user.get('password'), function (passErr, passwordMatch) {
                if(passErr) {
                    responseData = {
                        'success': true,
                        'statusCode': 400,
                        'data': null,
                        'errors': passErr,
                        'message': 'Something went wrong while fetching user data!'
                    }
                    helper.sendResponse(responseData, res)
                }
                else {
                    if (passwordMatch) {
                        userData = {
                            'email': user.get('email')
                        }
                        utils.generateAuthToken(user.get('id'), function (tokenErr, token) {
                            responseData = {
                                'success': true,
                                'statusCode': 200,
                                'data': {
                                    'user': userData,
                                    'X-Auth-Token': token
                                },
                                'errors': null,
                                'message': 'User data fetched successfully!'
                            }
                        })
                    }
                    else {
                        responseData = {
                            'success': true,
                            'statusCode': 400,
                            'data': null,
                            'errors': passErr,
                            'message': 'Password Mismatch!'
                        }
                    }
                }
                helper.sendResponse(responseData, res)
            })
        })
    })

    router.get('/', function (req, res) {
        responseData = {}
        if ('authorization' in req.headers && req.headers.authorization.length > 0) {
            utils.verifyAuthToken(req.headers.authorization, function (authErr, authorised) {
                if(authErr) {
                    responseData = {
                        'success': false,
                        'statusCode': 401,
                        'data': null,
                        'errors': authErr,
                        'message': 'Unauthorized User!'
                    }
                }
                else {
                    neode.first('User', 'id', authorised)
                    .then(user => {
                        responseData = {
                            'success': true,
                            'statusCode': 200,
                            'data': {
                                'email': user.get('email')
                            },
                            'errors': null,
                            'message': 'User data fetched successfully!'
                        }
                        helper.sendResponse(responseData, res)
                    })
                }
            })
        }
    })

    return router;
};
