const {uri} = require("../../private/mongoCreds");
const Promise = require("bluebird");
const userLib = require("../../lib/userLib");
const mongoose = require('mongoose');
const Books = require('../../db/books');
const utils = require("../../lib/utils");



module.exports.handler = (event, context, cb) => {
    console.log('event', event);
    //userId or security token should be passed in the header as a secure parameter. For ease of implementation, have taken it as part of body
    const userId = event.queryStringParameters && event.queryStringParameters.userId;

    const bookToDelete = event.queryStringParameters && event.queryStringParameters.bookId;

    //find User and validate if the user can delete

    //hardcoded for ease of testing
    // const userId="123";
    // const bookToDelete = null;

    return Promise.try(() => {
        return userLib.findUserByUserId(userId)
            .then(user => {
                if (!user) {
                    throw new Error("Invalid userId!");
                }
                userLib.validateUserToDeleteBook(user);
                return user;
            })
            .then(user => {
                //check whether to delete single book or all books
                if(bookToDelete){
                    return Books.remove({_id : bookToDelete});
                }
                return Books.remove({})//.then()
            })
    })
        .then(async ()=> {
            await mongoose.connection.close();
            await mongoose.disconnect();
            return utils.callbackSuccess(cb,{})
        })
        .catch(err => console.log(err));
};