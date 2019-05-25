module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "name":"string",
    "description":"text",

    "tags":"array",
    "parentTopicId":"string",

    "format":{
        type: "string",
        valid: ['pdf','url','doc','pub']
    },
    "price":"float",
    "link":{
        type: "string",
        uri: {
            scheme: ["http", "https"]
        }
    },

    "createdBy": {
        type: "relationship",
        target: "User",
        relationship: "CREATED_BY",
        direction: "in",
        properties: {
            name: "string"
        },
        eager: true
    },
    "version":"number",
    "lastLogin":"datetime",
    "createdAt":"datetime",
    "updatedAt":"datetime"
};
