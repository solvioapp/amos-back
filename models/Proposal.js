module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "name":"string",
    "description":"text",

    "tags":"array",

    "topicId":{
        type: "relationship",
        target: "Topic",
        relationship: "TOPIC_ID",
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
