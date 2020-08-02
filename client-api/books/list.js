const {uri} = require("../../private/mongoCreds");
const MongoClient = require('mongodb').MongoClient;
const Promise = require("bluebird");
const userLib = require("../../lib/userLib");
const client = new MongoClient(uri, { useNewUrlParser: true });

exports.handler = (event) => {
  console.log('event', event);
  
  //userId or security token should be passed in the header as a secure parameter. For ease of implementation, have taken it as part of body
//   const userId = event.queryStringParameters && event.queryStringParameters.userId;
  
  //find User and validate if the user can create a new book
  
  return Promise.try(()=>{

    // return userLib.findUserByUserId(userId)
    //   .then(user=>{
    //   if(!user){
    //     throw new error("Invalid userId!");
    //   }
    //   userLib.validateUserToReadBook(user);
    //   return user;
    // })
    // .then(user=>{
      return client.connect(err => {
        const collection = client.db("books").collection("books");
        return collection.find().toArray().then((allBooks)=>{
            console.log('allBooks', allBooks);
            client.close()
        });
      });
    })
  // })
  .catch(err=>console.log(err));
};

console.log(this.handler());