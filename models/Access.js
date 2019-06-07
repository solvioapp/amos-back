module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },

    "format": "string",
    "price": "float",
    "link": "string",

    "version":"number",
    "lastLogin":"datetime",
    "createdAt":"datetime",
    "updatedAt":"datetime"
};
