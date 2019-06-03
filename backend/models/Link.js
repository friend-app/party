const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linksSchema = new Schema({
    link: {
        type: String,
        required: true,
        unique: true
    },
    eventId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('links', linksSchema)