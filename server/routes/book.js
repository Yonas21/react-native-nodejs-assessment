var express = require("express");
var bookRouter = express.Router();
const {
	addBook,
	getAllBooks,
	getOneBook,
	updateBook,
	deleteBook,
	deleteAllBooks,
} = require("../controlller/book.controller");

/* GET all books. */
bookRouter.get("/getBooks", getAllBooks);
bookRouter.get("/getBooks/:bookID", getOneBook);
bookRouter.post("/addBook", addBook);
bookRouter.put("/editBook/:bookID", updateBook);
bookRouter.delete("/deleteBook/:bookID", deleteBook);
bookRouter.delete("/deleteBooks", deleteAllBooks);
module.exports = bookRouter;
