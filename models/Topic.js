module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "name":"string",
    "createdBy": {
        type: "relationship",
        target: "User",
        relationship: "CREATED_BY",
        direction: "in",
        properties: {
            id: "uuid"
        },
        eager: true,
        cascade: 'detach'
    },
    "parent": {
        type: "relationship",
        target: "Topic",
        relationship: "CHILD_OF",
        direction: "in",
        properties: {
            id: 'uuid'
        },
        eager: true,
        cascade: 'detach'
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
