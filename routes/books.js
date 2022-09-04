const express = require("express");

const { books } = require("../Data/Books.json");
const { users } = require("../Data/users.json");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById, deleteBookByID } = require("../controllers/book-controller");

const router = express.Router();

/** 
 * Route: /books
 * Method: GET
 * Description: GEtting all books
 * Access: Public
 * Parameters: none
 */
router.get("/", getAllBooks);



/** 
 * Route: /books/:id
 * Method: GET
 * Description: GEtting  books by id
 * Access: Public
 * Parameters: none
 */

router.get("/:id", getSingleBookById);



/** 
 * Route: /books/issued/by-user
 * Method: GET
 * Description: GEtting issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route : /books
 * Method : POST
 * Description : Create New Book 
 * Access : Public 
 * Parameters : none
 * Data : Id , Name , Genre , Author , Publisher , Price
 */
router.post("/", addNewBook);


/**
 * Route : /books
 * Method : DELETE
 * Description : Deleting book
 * Access : Public 
 * Parameters : id
 * 
 */
router.delete('/:id', deleteBookByID);

/**
 * Route : /books/:id
 * Method : PUT
 * Description : UPdating book Details
 * Access : Public 
 * Parameters : id
 * Data : Id , Name , Genre , Author , Publisher , Price
 */

router.put("/:id", updateBookById);


module.exports = router;