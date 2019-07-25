module.exports = function(neode) {
    const router = require('express').Router();
    var utils = require('../utils');
    var helper = require('../helper');
    // var moment = require('moment');

    // Fetch all Resources.
    router.get('/', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.all('Resource')
        .then(resources => {
            console.log('resources:', resources.length);
            if (resources.length > 0) {
                allResources = []
                for (var i = 0; i < resources.length; i++) {
                    // Todo: Have to call extended relations from AmosGame.
                    allResources.push({
                        'id': resources.get(i).get('id'),
                        'link': resources.get(i).get('link'),
                        'title': resources.get(i).get('title')
                    })
                }
                if (allResources.length == resources.length) {
                    // console.log('allResources:', allResources);
                    responseData = {
                        'success': true,
                        'statusCode': 200,
                        'data': allResources,
                        'errors': null,
                        'message': 'All Resources fetched successfully!'
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
                    'message': 'No Resources found!'
                }
                helper.sendResponse(responseData, res)
            }
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Could not fetch Resources',
                'message': 'Something went wrong while trying to fetch all resources!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    // Fetch Resource by id.
    router.get('/:resourceId', helper.checkAuth, function (req, res) {
        responseData = {}
        neode.first('Resource', 'id', req.params.resourceId)
        .then(resourceData => {
            responseData = {
                'success': true,
                'statusCode': 200,
                'data': {
                    'id': resourceData.get('id'),
                    'link': resourceData.get('link'),
                    'title': resourceData.get('title')
                },
                'errors': null,
                'message': 'Resource data fetched successfully!'
            }
            helper.sendResponse(responseData, res)
        })
        .catch(() => {
            responseData = {
                'success': true,
                'statusCode': 400,
                'data': null,
                'errors': 'Could not fetch resource',
                'message': 'Something went wrong while trying to fetch specific resource! Please try again!'
            }
            helper.sendResponse(responseData, res)
        })
    })

    return router;
};
