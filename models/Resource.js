module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "link":"string",
    "title":"string",
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
