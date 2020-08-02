const {uri} = require("../../t/private/mongoCreds");
const Promise = require("bluebird");
const userLib = require("../../t/lib/userLib");
const mongoose = require('mongoose');
const Books = require('../../t/db/books');
const utils = require("../../t/lib/utils");
// const connect = mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true});


module.exports.handler = (event, context, cb) => {
    console.log('event', event);
    const eventData = JSON.parse(event.body);
    // const eventData = event.body;

    // verify if we have all necessary fields to create a book
    const author = eventData.author;
    const title = eventData.title;
    const isbn = eventData.isbn;
    const releaseDate = eventData.releaseDate;

    if (!(author && title && isbn)) {
        throw new Error("Missing one or more required fields!");
    }


    //userId or security token should be passed in the header as a secure parameter. For ease of implementation, have taken it as part of body
    const userId = eventData.userId;

    //find User and validate if the user can create a new book

    return Promise.try(() => {

        return userLib.findUserByUserId(userId)
            .then(user => {
                if (!user) {
                    throw new Error("Invalid userId!");
                }
                //check if user has permission
                userLib.validateUserToCreateBook(user);
                return user;
            })
            .then(user => {
                // return connect.then(db => {
                    const objToInsert = Books({
                        author: author,
                        createdBy: userId,
                        createdAt: Date.now(),
                        title: title,
                        ISBN: isbn,
                        releaseDate: releaseDate || "TBA"
                    });
                    return objToInsert.save().then()
                // })
            })
    })
        .then(async ()=> {
            //close open mongo connections
                await mongoose.connection.close();
                await mongoose.disconnect();
                return utils.callbackSuccess(cb, {})
            })
        .catch(err => console.log(err));
};