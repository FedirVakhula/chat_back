const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: String,
    author: String,
    comments: [Object],
    like: Number,
    dislike: Number,
    date: Date
});

module.exports = model('ITask', schema);