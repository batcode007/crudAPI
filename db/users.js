const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true
    }

},{
    timestamps: true
});

const Users = mongoose.model('User', UsersSchema);
module.exports = Users;