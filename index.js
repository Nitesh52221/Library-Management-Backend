const express = require("express");
const dotenv = require('dotenv');
const DbConnection = require('./databaseConnection');
// importing Routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");


dotenv.config();
const app = express();



const port = 3000;

app.use(express.json());
DbConnection();

/**
 * Routes : /
 * Method : GET
 * Description: Hompage
 * Access: Public
 * Parameters: none
 */
app.get("/", (req, res) => {
    res.status(200).json({
        message: "WELCOME TO THE LIBRARY.",
    });
});





app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.all("/", (req, res) => {
    res.status(500).json({
        message: "PAge not found"
    })
})
app.get("*", (req, res) => {
    res.status(500).json({
        message: "This Route Not Exsist ."
    })
})

app.listen(port, () => {
    console.log(`my Node js server started on port ${port}`)
})