const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    ISBN:{
        type: String,
        required : true
    }

},{
    timestamps: true
});

const Books = mongoose.model('Book', booksSchema);

module.exports = Books;