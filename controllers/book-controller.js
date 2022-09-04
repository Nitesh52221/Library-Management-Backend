const IssuedBook = require("../dtos/book-dto");
const { BookModel, UserModel } = require('../models');

exports.getAllBooks = async (req, res) => {
    const books = await BookModel.find();

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Book Found",
        });
    }

    res.status(200).json({
        success: true,
        data: books,
    });
};

exports.getSingleBookById = async (req, res) => {
    const { id } = req.params;

    const book = await BookModel.findById(id)
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

};

exports.getAllIssuedBooks = async (req, res) => {
    const user = await UserModel.find({
        issuedBook: { $exists: true },
    }).populate("issuedBook");
    const issuedBooks = user.map((each) => new IssuedBook(each))



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
};

exports.addNewBook = async (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No Data Provided",
        });
    }

    await BookModel.create(data);
    const allBooks = await BookModel.find();

    return res.status(200).json({
        success: true,
        data: allBooks,
    });
};

exports.updateBookById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const updateBook = await BookModel.findOneAndUpdate(
        { _id: id, }, data, { new: true, }
    );

    return res.status(200).json({
        success: true,
        data: updateBook,
    });
}



exports.deleteBookByID = async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.deleteOne({
        _id: id,
    });


    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book to be deleted not found",
        });
    }



    return res.status(200).json({
        success: true,
        data: book,
    });
}





