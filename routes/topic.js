module.exports = function(neode) {
    const router = require('express').Router();
    var utils = require('../utils');
    var helper = require('../helper');
    // var moment = require('moment');

    // create new Topic.
    // Should be allowed only to admin for now.
    router.post('/', helper.checkAuth, helper.checkAccess, function (req, res) {
        responseData = {}
        neode.create('Topic', {
            name: req.body.name
        })
        .then(topicData => {
            neode.first('User', 'id', req.authorised)
            .then(user => {
                // var time = moment();
                // var time_format = time.format('YYYY-MM-DD HH:mm:ss Z');
                // console.log('time_format:', time_format);
                topicData.relateTo(user, 'createdBy')
                .then(rel => {
                    // console.log('rel:', rel);
                    responseData = {
                        'success': true,
                        'statusCode': 201,
                        'data': {
                            'id': topicData.get('id'),
                            'name': topicData.get('name')
                        },
                        'errors': null,
                        'message': 'New topic successfully created!'
                    }
                    helper.sendResponse(responseData, res)
                })
                .catch(() => {
                    responseData = {
                        'success': true,
                        'statusCode': 400,
                        'data': null,
                        'errors': 'Could not relate Topic to User',
                        'message': 'Please contact admin with your topic!'
                    }
                    helper.sendResponse(responseData, res)
                })
            })
            .catch(() => {
                responseData = {
                    'success': true,
                    'statusCode': 400,
                    'data': null,
                    'errors': 'Could not find User',
                    'message': 'Something went wrong while trying to your data! Please re-login to continue!'
                }
                helper.sendResponse(responseData, res)
            })
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Could not create Topic',
                'message': 'Something went wrong while trying to create Topic!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Fetch all topics.
    router.get('/', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.all('Topic')
        .then(topics => {
            console.log('topics:', topics.length);
            if (topics.length > 0) {
                allTopics = []
                for (var i = 0; i < topics.length; i++) {
                    allTopics.push({
                        'id': topics.get(i).get('id'),
                        'name': topics.get(i).get('name')
                    })
                }
                if (allTopics.length == topics.length) {
                    // console.log('allTopics:', allTopics);
                    responseData = {
                        'success': true,
                        'statusCode': 200,
                        'data': allTopics,
                        'errors': null,
                        'message': 'All Topics fetched successfully!'
                    }
                    helper.sendResponse(responseData, res)
                }
            }
            else {
                responseData = {
                    'success': true,
                    'statusCode': 400,
                    'data': null,
                    'errors': 'Not Found',
                    'message': 'No Topic found!'
                }
                helper.sendResponse(responseData, res)
            }
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Could not fetch Topics',
                'message': 'Something went wrong while trying to fetch all Topics!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Fetch topic by id.
    router.get('/:topicId', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('Topic', 'id', req.params.topicId)
        .then(topicData => {
            responseData = {
                'success': true,
                'statusCode': 200,
                'data': {
                    'id': topicData.get('id'),
                    'name': topicData.get('name')
                },
                'errors': null,
                'message': 'Topic data fetched successfully!'
            }
            helper.sendResponse(responseData, res)
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Not Found',
                'message': 'Something went wrong while fetch this specific Topic! Pelase try again later!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Delete topic by id.
    // Todo: Soft delete
    router.delete('/:topicId', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('Topic', 'id', req.params.topicId)
        .then(topic => {
            req.body.id = req.params.topicId
            topic.delete()
            .then(() => {
                // console.log('updatedUser:', updatedUser);
                responseData = {
                    'success': true,
                    'statusCode': 200,
                    'data': null,
                    'errors': null,
                    'message': 'Topic successfully deleted!'
                }
                helper.sendResponse(responseData, res)
            })
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Could not delete Topic',
                'message': 'Something went wrong while delete to this Topic! Please refresh and try again!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Update topic by id.
    router.put('/:topicId', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('Topic', 'id', req.params.topicId)
        .then(topic => {
            req.body.id = req.params.topicId
            topic.update(req.body)
            .then(updatedTopic => {
                // console.log('updatedTopic:', updatedTopic);
                responseData = {
                    'success': true,
                    'statusCode': 200,
                    'data': {
                        'id': updatedTopic.get('id'),
                        'name': updatedTopic.get('name')
                    },
                    'errors': null,
                    'message': 'Topic data fetched successfully!'
                }
                helper.sendResponse(responseData, res)
            })
            .catch(() => {
                responseData = {
                    'success': true,
                    'statusCode': 400,
                    'data': null,
                    'errors': 'Could not update Topic data',
                    'message': 'Something went wrong while trying to update Topic data!'
                }
                helper.sendResponse(responseData, res)
            })
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Could not fetch Topic',
                'message': 'Something went wrong while finding your Topic! Please try again later!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    return router;
};
