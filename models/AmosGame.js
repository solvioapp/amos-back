module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "resource": {
        type: "relationship",
        target: "Resource",
        relationship: "FOR",
        direction: "out",
        properties: {},
        eager: true,
        cascade: 'detach'
    },
    "votes": {
        type: "relationship",
        target: "User",
        relationship: "VOTED_ON",
        direction: "in",
        properties: {
            vote: "number"
        },
        eager: true,
        cascade: 'detach'
    },
    "type": {
        type: "string",
        allow: ['resource', 'learning_dependency']
    },
    "strength": {
        type: "string",
        allow: ['additional','recommended','necessary']
    },
    "level": {
        type: "string",
        allow: ['beginner', 'intermediate', 'expert']
    },
    "version":"number",
    "lastLogin":"datetime",
    "createdAt":"datetime",
    "updatedAt":"datetime"
};
