var express = require("express");
const multer = require("multer");
var bookRouter = express.Router();
const {
	addBook,
	getAllBooks,
	getOneBook,
	updateBook,
	deleteBook,
	deleteAllBooks,
} = require("../controlller/book.controller");

// filter images to be stored
const imageFilter = (req, file, cb) => {
	if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

/**
 * decide where to upload and the what the name of the file will be
 */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

/**
 * decide the size and upload image
 */

const upload = multer({
	storage: storage,
	limits: 1024 * 1024 * 30,
	fileFilter: imageFilter,
});

/* GET all books. */
bookRouter.get("/getBooks", getAllBooks);
bookRouter.get("/getBooks/:bookID", getOneBook);
bookRouter.route("/addBook").post(upload.single("coverImage"), addBook);
bookRouter.put("/editBook/:bookID", updateBook);
bookRouter.delete("/deleteBook/:bookID", deleteBook);
bookRouter.delete("/deleteBooks", deleteAllBooks);
module.exports = bookRouter;
