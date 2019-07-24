module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "resource": {
        type: "relationship",
        target: "Resource",
        relationship: "RATED_FOR",
        direction: "in",
        properties: {},
        eager: true,
        cascade: 'detach'
    },

    "votedBy": {
        type: "relationship",
        target: "User",
        relationship: "VOTED_BY",
        direction: "out",
        properties: {},
        eager: true,
        cascade: 'detach'
    },

    "version":"number",
    "lastLogin":"datetime",
    "createdAt":"datetime",
    "updatedAt":"datetime"
};
