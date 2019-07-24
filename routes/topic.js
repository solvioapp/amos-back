module.exports = function(neode) {
    const router = require('express').Router();
    var utils = require('../utils');
    var helper = require('../helper');
    // var moment = require('moment');

    // create new Topic.
    // Should be allowed only to admin for now.
    router.post('/', helper.checkAuth, function (req, res) {
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
                });
            })
        });
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
                        'id': topics.get(0).get('id'),
                        'name': topics.get(0).get('name')
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
    })

    // Delete topic by id.
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
        })
    })

    return router;
};
