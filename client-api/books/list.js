const {uri} = require("../../private/mongoCreds");
const Promise = require("bluebird");
const userLib = require("../../lib/userLib");
const mongoose = require('mongoose');
const Books = require('../../db/books');
const utils = require("../../lib/utils");



module.exports.handler = (event, context, cb) => {
    console.log('event', event);
    //userId or security token should be passed in the header as a secure parameter. For ease of implementation, have taken it as part of body
    // const userId = event.queryStringParameters && event.queryStringParameters.userId;

    //find User and validate if the user can create a new book
    const userId="123";
    return Promise.try(() => {
        return userLib.findUserByUserId(userId)
            .then(user => {
                if (!user) {
                    throw new Error("Invalid userId!");
                }
                userLib.validateUserToFetchBook(user);
                return user;
            })
            .then(user => {
                // return connect.then(db => {
                // const findBooks = Books();
                return Books.find({})//.then()
                // });
                // })
            })
    })
        .then(async (books)=> {
            books = books.map(book=>book._doc);
            const data = {
                "books" : books
            };
            await mongoose.connection.close();
            await mongoose.disconnect();
            return utils.callbackSuccess(cb, data)
        })
        .catch(err => console.log(err));
};

console.log(this.handler());