module.exports = function(neode) {
    const router = require('express').Router();
    var utils = require('../utils');

    router.post('/', function (req, res) {
        responseData = {}
        console.log('body:', req.body);
        utils.encrypt(req.body.password, function (err, password) {
            // console.log('utils encrypt:', err, password);
            neode.create('User', {
                email: req.body.email,
                password: password
            })
            .then(userData => {
                // console.log('New user with email:', userData.get('email'), 'is now registered on AMOS!');
                responseData = {
                    'success': true,
                    'statusCode': 201,
                    'data': userData.get(),
                    'errors': null,
                    'message': 'New user successfully registered!'
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(responseData));
            });
        })
    })

    return router;
};
