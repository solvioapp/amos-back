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

    "version":"number",
    "lastLogin":"datetime",
    "createdAt":"datetime",
    "updatedAt":"datetime"
};
