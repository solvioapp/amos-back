module.exports = function(neode) {
    const router = require('express').Router();
    var utils = require('../utils');
    var helper = require('../helper');
    // var moment = require('moment');

    // create new Amos Game.
    router.post('/', helper.checkAuth, function (req, res) {
        responseData = {}
        // Validate request data
        let amosGameRequestData = {
            type : req.body.type
        }
        if (req.body.type == 'learning_dependency') {
            amosGameRequestData.strength = req.body.strength
            amosGameRequestData.level = req.body.level
        }
        neode.create('Resource', {
            link: req.body.link
        })
        .then(resource => {
            neode.create('AmosGame', amosGameRequestData)
            .then(amosGameData => {
                amosGameData.relateTo(resource, 'resource')
                .then(rel => {
                    // console.log('rel:', rel);
                    // Todo: Decide weather to put a default by the user who added the resource.
                    responseData = {
                        'success': true,
                        'statusCode': 201,
                        'data': {
                            'id': amosGameData.get('id')
                        },
                        'errors': null,
                        'message': 'New Resource Added!'
                    }
                    helper.sendResponse(responseData, res)
                })
                .catch(() => {
                    responseData = {
                        'success': true,
                        'statusCode': 400,
                        'data': null,
                        'errors': 'Could not realte amos game to user!',
                        'message': 'Please contact the admin with your resource link to get this error verified!'
                    }
                    helper.sendResponse(responseData, res)
                })
            })
            .catch(() => {
                responseData = {
                    'success': true,
                    'statusCode': 400,
                    'data': null,
                    'errors': 'Could not add new AmosGame',
                    'message': 'Something went wrong while creating new Amos Game!'
                }
                helper.sendResponse(responseData, res)
            })
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Could not add new Resource',
                'message': 'Something went wrong while adding new resource!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Fetch all Amos Games.
    router.get('/', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.all('AmosGame')
        .then(amosGames => {
            console.log('amosGames:', amosGames.length);
            if (amosGames.length > 0) {
                allAmosGames = []
                for (var i = 0; i < amosGames.length; i++) {
                    // Todo: Have to call extended relations from Votes and Resource.
                    allAmosGames.push({
                        'id': amosGames.get(i).get('id'),
                        'type': amosGames.get(i).get('type')
                    })
                }
                if (allAmosGames.length == amosGames.length) {
                    // console.log('allAmosGames:', allAmosGames);
                    responseData = {
                        'success': true,
                        'statusCode': 200,
                        'data': allAmosGames,
                        'errors': null,
                        'message': 'All Amos Games fetched successfully!'
                    }
                    helper.sendResponse(responseData, res)
                }
            }
            else {
                responseData = {
                    'success': true,
                    'statusCode': 200,
                    'data': null,
                    'errors': null,
                    'message': 'No active Amos Game found!'
                }
            }
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Could not fetch Amos Games',
                'message': 'Something went wrong while fetching amos games! Please again in sometime!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Fetch Amos Game by id.
    router.get('/:amosGameId', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('AmosGame', 'id', req.params.amosGameId)
        .then(amosGameData => {
            responseData = {
                'success': true,
                'statusCode': 200,
                'data': {
                    'id': amosGameData.get('id'),
                    'type': amosGameData.get('type')
                },
                'errors': null,
                'message': 'Amos Game data fetched successfully!'
            }
            helper.sendResponse(responseData, res)
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Not Found',
                'message': 'Amos Game not found!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Delete topic by id.
    // Todo: Implement soft delete.
    router.delete('/:amosGameId', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('AmosGame', 'id', req.params.amosGameId)
        .then(amosGame => {
            req.body.id = req.params.amosGameId
            amosGame.delete()
            .then(() => {
                // console.log('updatedUser:', updatedUser);
                responseData = {
                    'success': true,
                    'statusCode': 200,
                    'data': null,
                    'errors': null,
                    'message': 'Amos Game successfully deleted!'
                }
                helper.sendResponse(responseData, res)
            })
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Could not delete Amos Game',
                'message': 'Something went wrong while trying to remove amos game!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Vote on an Amos Game.
    router.post('/:amosGameId/vote', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('User', 'id', req.authorised)
        .then(user => {
            neode.first('AmosGame', 'id', req.params.amosGameId)
            .then(amosGameData => {
                amosGameData.relateTo(user, 'votes', {vote: 1})
                .then(rel => {
                    console.log('rel:', rel);
                    // Todo: Fetch votes sum so far.
                    responseData = {
                        'success': true,
                        'statusCode': 201,
                        'data': {},
                        'errors': null,
                        'message': 'Voted Successfully!'
                    }
                    helper.sendResponse(responseData, res)
                })
                .catch(() => {
                    responseData = {
                        'success': true,
                        'statusCode': 400,
                        'data': null,
                        'errors': 'Amos Game voting error',
                        'message': 'Something went wrong while voting for Amos Game! If this error persists, please contact admin!'
                    }
                    helper.sendResponse(responseData, res)
                })
            })
            .catch(() => {
                responseData = {
                    'success': true,
                    'statusCode': 400,
                    'data': null,
                    'errors': 'Amos Game fetch error',
                    'message': 'Something went wrong while fetching specified Amos Game!'
                }
                helper.sendResponse(responseData, res)
            })
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Could not fetch User',
                'message': 'Something went wrong while fetching your data! Please logout and login again to continue!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Fetch All Votes for AmosGame by id.

    return router;
};
