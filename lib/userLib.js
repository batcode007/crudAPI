// class User {
//     constructor(user){

//     } 
// }

const {uri} = require("../private/mongoCreds");
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });


module.exports.findUserByUserId = function (userId) {
    console.log('check1');
    return client.connect(err => {
        console.log('check2');
        const collection = client.db("books").collection("users");
        const query = {
          userId : userId
        };
        return collection.findOne(query);
        // .then((user)=>user).then(()=>client.close());
      });
};

module.exports.validateUserToCreateBook = (user)=>{
    return true;
}