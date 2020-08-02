const {uri} = require("../private/mongoCreds");
const mongoose = require('mongoose');
const connect = mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true});
const Users = require("../db/users");

module.exports.findUserByUserId = (userId) => {
    return connect.then(async (db) => {
        const query = {
          userId : userId
        };
        let user = await Users.findOne(query);
            // .then((user)=>{
            //     return user._doc;
            // })
        // await mongoose.connection.close();
        return user && user._doc;
      });
};

module.exports.validateUserToCreateBook = (user)=>{
    return true;
};

module.exports.validateUserToFetchBook = (user)=>{
    return true;
};

module.exports.validateUserToDeleteBook = (user)=>{
    return true;
};

module.exports.validateUserToUpdateBook = (user) =>{
    return true;
};