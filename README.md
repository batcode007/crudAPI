# crudAPI

This repo contains an api collection demonstrating all four CRUD operations.

The apis are hosted on aws api gateway and aws lambda.

The database used is mongodb and hosted on mlab.

API Endpoints : 
1. Create (POST) : {url}/create
    (all details passed in body)
2. Read (GET) : {url}/getBooks?bookId=bookId
3. Update (PUT) : {url}/bookUpdate/:bookId
4. Delete (DELETE) : {url}/bookDelete?bookId=bookId
