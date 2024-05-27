const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creation: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cities', citySchema);
