# Library-Management-Backend

This is Library Management API BackEnd for management of books and students records .

# Documentation

https://documenter.getpostman.com/view/23029976/VUxNR85c

# Routes And Endpoints

# users

All the users route End-Point with all method.

## http://localhost:8000/

GET : This is HomePgae.

## /users

GET : Getting all the users.
POST : Creating a new User.

## /users/:id

GET : Getting Detials of user on the Basis of their ID.
PUT : Updating User Data.
DELETE : deleting user data.

## /users/subscription-details/:id

GET : get subscription detail of a particular user with id.

# books

All the books route End-Point with all method.

## /books

GET : Getting all the books
POST : Create New Book

## /books/:id

GET : Getting Book Details using ID.
PUT : Updating book Details
DELETE : Deleting a book

## /books/issued/by-user

GET : Getting issued books
