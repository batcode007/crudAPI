/*Create a RESTful web service for a Library. The service must have the following API endpoints:
  (C)reate a new Book
(R)ead existing Books
(U)pdate an existing Book
(D)elete an existing Book

A Book entity has the following properties:
  Author (mandatory)
Title (mandatory)
ISBN (mandatory)
Release Date

Important “must have” measures:
  Code must be covered with unit tests
Clean, easy to understand and maintainable
Be RESTful
Validate inputs
Dockerizing your application, i.e. besides the GitHub code repo please also host it and give us a demo link [you can use a trial account of AWS/GCP/Azure to do this]
Avoid using frameworks (e.g. Laravel, Sprint Boot) -- we’d like to see all code written from the ground up to understand your abilities regardless of a framework

Bonus points:
  Endpoints covered with system/functional tests
API documented (OpenAPI)

You could choose to do this test in Node or Golang, or PHP if neither is possible.

  Provide a code you can be proud of, what really reflects your knowledge.
  We are not curious about if you know how to use an all around framework, but we’d like to assess your real coding skills.
  If you feel the task takes too much time, implement only a part of it (like one or two endpoints only), but what you implement should meet every requirement.
*/


const {uri} = require("../../private/mongoCreds");
const MongoClient = require('mongodb').MongoClient;
const Promise = require("bluebird");
const userLib = require("../../lib/userLib");
const client = new MongoClient(uri, { useNewUrlParser: true });

exports.handler = (event) => {
  console.log('event', event,event.body);
  const eventData = event.body;

  // verify if we have all necessary fields to create a book
  const author = eventData.author;
  const title = eventData.title;
  const isbn = eventData.isbn;
  const releaseDate = eventData.releaseDate;

  if(!(author && title && isbn)){
    throw new Error("Missing one or more required fields!");
  }

  
  //userId or security token should be passed in the header as a secure parameter. For ease of implementation, have taken it as part of body
  const userId = eventData.userId;
  
  //find User and validate if the user can create a new book
  
  return Promise.try(()=>{

    // return userLib.findUserByUserId(userId)
    //   .then(user=>{
    //   if(!user){
    //     throw new error("Invalid userId!");
    //   }
    //   userLib.validateUserToCreateBook(user);
    //   return user;
    // })
    // .then(user=>{
      return client.connect(err => {
        console.log('test1');
        const collection = client.db("books").collection("books");
        const objToInsert = {
          author : author,
          createdBy : userId,
          createdAt : Date.now(),
          title : title,
          ISBN : isbn,
          releaseDate : releaseDate || "TBA"
        };
        return collection.insertOne(objToInsert).then(()=>client.close());
      });
    })
  // })
  .catch(err=>console.log(err));
};

// console.log(this.handler({body:{
//   userId : '123',
//   'title' : 'test',
//   'author' : 'test',
//   isbn : 'qwe'
// }}));