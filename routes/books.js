const express = require("express");

const { books } = require("../Data/Books.json");
const { users } = require("../Data/users.json");

const { route } = require("./users");

const router = express.Router();



/** 
 * Route: /books
 * Method: GET
 * Description: GEtting all books
 * Access: Public
 * Parameters: none
 */
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    })
});



/** 
 * Route: /books/:id
 * Method: GET
 * Description: GEtting  books by id
 * Access: Public
 * Parameters: none
 */

router.get("/:id", (req, res) => {
    const { id } = req.params;

    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book Not Found",
        });
    }

    return res.status(200).json({
        success: true,
        data: book,
    });

});



/** 
 * Route: /books/issued/by-user
 * Method: GET
 * Description: GEtting issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user", (req, res) => {
    const usersWithIssuedBooks = users.filter((each) => {
        if (each.issuedBook) return each;

    });

    const issuedBooks = [];

    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        book.issuedBy = each.name;
        book.issuedByID = each.id;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;


        issuedBooks.push(book);
    });

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No books issued yet",
        });
    }
    return res.status(200).json({
        success: true,
        data: issuedBooks,
    });
});

/**
 * Route : /books
 * Method : POST
 * Description : Create New Book 
 * Access : Public 
 * Parameters : none
 * Data : Id , Name , Genre , Author , Publisher , Price
 */
router.post("/", (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No Data Provided",
        });
    }
    const book = books.find((each) => each.id === data.id)

    if (book) {
        return res.status(400).json({
            success: false,
            message: "Book alredy exsits",
        });
    }

    const allBook = [...books, data];

    return res.status(200).json({
        success: true,
        data: allBook,
    });
});


/**
 * Route : /books
 * Method : DELETE
 * Description : Deleting book
 * Access : Public 
 * Parameters : id
 * 
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id == id);


    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book to be deleted not found",
        });
    }

    const index = books.indexOf(book);
    books.splice(index, 1);

    return res.status(200).json({
        success: true,
        data: books,
    });
});

/**
 * Route : /books/:id
 * Method : PUT
 * Description : UPdating book Details
 * Access : Public 
 * Parameters : id
 * Data : Id , Name , Genre , Author , Publisher , Price
 */

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not Found"
        })
    }
    const updataBook = books.map((each) => {
        if (each.id === id) {
            return { ...each, ...data };

        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data: updataBook,
    });
});


module.exports = router;