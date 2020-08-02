const {uri} = require("../../private/mongoCreds");
const Promise = require("bluebird");
const userLib = require("../../lib/userLib");
const mongoose = require('mongoose');
const Books = require('../../db/books');
const utils = require("../../lib/utils");

module.exports.handler = (event, context, cb) => {
    console.log('event', event);
    const eventData = JSON.parse(event.body);

    const bookIdToUpdate = eventData.bookId;
    const updateObj = eventData.updateObj;

    //userId or security token should be passed in the header as a secure parameter. For ease of implementation, have taken it as part of body
    const userId = eventData.userId;

    //find User and validate if the user can create a new book

    return Promise.try(() => {

        return userLib.findUserByUserId(userId)
            .then(user => {
                if (!user) {
                    throw new Error("Invalid userId!");
                }
                userLib.validateUserToUpdateBook(user);
                return user;
            })
            .then(user => {
                return Books.update({_id : bookIdToUpdate}, updateObj).then()
            })
    })
        .then(async ()=> {
            await mongoose.connection.close();
            await mongoose.disconnect();
            return utils.callbackSuccess(cb, {})
        })
        .catch(err => console.log(err));
};