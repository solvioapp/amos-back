module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "link":"string",

    "title":"string",
    "description":"text",

    "tags":"array",

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
