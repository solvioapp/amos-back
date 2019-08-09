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
        properties: {
            id: 'uuid'
        },
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
    "version":{
        type: "number",
        default: 1
    },
    "createdAt":{
        type: "datetime",
        default: () => new Date()
    },
    "updatedAt": {
        type: "datetime",
        default: () => new Date()
    }
};
