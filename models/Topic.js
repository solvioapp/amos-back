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
        properties: {},
        eager: true,
        cascade: 'detach'
    },
    "parent": {
        type: "relationship",
        target: "Topic",
        relationship: "CHILD_OF",
        direction: "in",
        properties: {},
        eager: true,
        cascade: 'detach'
    },
    "version":"number",
    "createdAt":"datetime",
    "updatedAt":"datetime"
};
