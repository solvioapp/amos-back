module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "link":"string",

    "title":"string",

    "createdBy": {
        type: "relationship",
        target: "User",
        relationship: "CREATED_BY",
        direction: "in",
        properties: {},
        eager: true,
        cascade: 'detach'
    },

    "version":"number",
    "lastLogin":"datetime",
    "createdAt":"datetime",
    "updatedAt":"datetime"
};
