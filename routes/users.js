module.exports = function(neode) {
    const router = require('express').Router();
    var utils = require('../utils');
    var helper = require('../helper');

    // register new User account.
    router.post('/', function (req, res) {
        responseData = {}
        console.log('body:', req.body);
        utils.encrypt(req.body.password, function (err, password) {
            if(err) {
                responseData = {
                    'success': true,
                    'statusCode': 400,
                    'data': null,
                    'errors': err,
                    'message': 'Encryption error! Please try again later!'
                }
                helper.sendResponse(responseData, res)
            }
            else {
                console.log('utils encrypt:', err, password);
                neode.create('User', {
                    email: req.body.email,
                    password: password,
                    role: "user" // By default everybody's a user.
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
                })
                .catch(() => {
                    responseData = {
                        'success': true,
                        'statusCode': 400,
                        'data': null,
                        'errors': 'Could not create User',
                        'message': 'Something went wrong while trying to create User!'
                    }
                    helper.sendResponse(responseData, res)
                })
            }
        })
    })

    // User Login.
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
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Invalid Email!',
                'message': 'User not found! Please hard refresh and try again!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Fetch Other user's data.
    router.get('/', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('User', 'id', req.authorised)
        .then(user => {
            responseData = {
                'success': true,
                'statusCode': 200,
                'data': {
                    'email': user.get('email'),
                    'firstName': user.get('firstName'),
                    'lastName': user.get('lastName'),
                    'username': user.get('username'),
                    'profileImageUrl': user.get('profileImageUrl')
                },
                'errors': null,
                'message': 'User data fetched successfully!'
            }
            helper.sendResponse(responseData, res)
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'User not found!',
                'message': 'Something went wrong while trying to fetch User! Please re-login if this issue persists!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Fetch Other user's data.
    // Should be allowed only to admin.
    router.get('/:userId', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('User', 'id', req.params.userId)
        .then(user => {
            responseData = {
                'success': true,
                'statusCode': 200,
                'data': {
                    'email': user.get('email'),
                    'firstName': user.get('firstName'),
                    'lastName': user.get('lastName'),
                    'username': user.get('username'),
                    'profileImageUrl': user.get('profileImageUrl')
                },
                'errors': null,
                'message': 'User data fetched successfully!'
            }
            helper.sendResponse(responseData, res)
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'User not found!',
                'message': 'Something went wrong while trying to fetch User! Please re-login if this issue persists!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Update user's own data.
    router.put('/', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('User', 'id', req.authorised)
        .then(user => {
            req.body.id = req.authorised
            user.update(req.body)
            .then(updatedUser => {
                // console.log('updatedUser:', updatedUser);
                responseData = {
                    'success': true,
                    'statusCode': 200,
                    'data': {
                        'email': updatedUser.get('email'),
                        'firstName': updatedUser.get('firstName'),
                        'lastName': updatedUser.get('lastName'),
                        'username': updatedUser.get('username'),
                        'profileImageUrl': updatedUser.get('profileImageUrl')
                    },
                    'errors': null,
                    'message': 'User data fetched successfully!'
                }
                helper.sendResponse(responseData, res)
            })
            .catch(() => {
                responseData = {
                    'success': true,
                    'statusCode': 400,
                    'data': null,
                    'errors': 'Could not update User data!',
                    'message': 'Something went wrong while trying to update User data! Please try again later!'
                }
                helper.sendResponse(responseData, res)
            })
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'User not found!',
                'message': 'Something went wrong while trying to fetch User! Please re-login if this issue persists!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Update other user's data.
    // Should be allowed only to admin.
    router.put('/:userId', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('User', 'id', req.params.userId)
        .then(user => {
            req.body.id = req.params.userId
            user.update(req.body)
            .then(updatedUser => {
                // console.log('updatedUser:', updatedUser);
                responseData = {
                    'success': true,
                    'statusCode': 200,
                    'data': {
                        'email': updatedUser.get('email'),
                        'firstName': updatedUser.get('firstName'),
                        'lastName': updatedUser.get('lastName'),
                        'username': updatedUser.get('username'),
                        'profileImageUrl': updatedUser.get('profileImageUrl')
                    },
                    'errors': null,
                    'message': 'User data fetched successfully!'
                }
                helper.sendResponse(responseData, res)
            })
            .catch(() => {
                responseData = {
                    'success': true,
                    'statusCode': 400,
                    'data': null,
                    'errors': 'Could not update User data!',
                    'message': 'Something went wrong while trying to update User data! Please try again later!'
                }
                helper.sendResponse(responseData, res)
            })
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'User not found!',
                'message': 'Something went wrong while trying to fetch User! Please re-login if this issue persists!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    return router;
};
