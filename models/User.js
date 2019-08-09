module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "username":{
        type: 'string',
        unique: true,
        indexed: true
    },
    "firstName":{
        type: "string",
        indexed: true
    },
    "lastName":"string",
    "email":{
        type: 'string',
        unique: true,
        indexed: true
    },
    "password":"string",
    "profileImageUrl": {
        type: "string",
        uri: {
            scheme: ["http", "https"]
        }
    },
    "role": {
        type: "string",
        allow: ["user", "admin"]
    },
    "version":{
        type: "number",
        default: 1
    },
    "lastLogin":{
        type: "datetime"
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
