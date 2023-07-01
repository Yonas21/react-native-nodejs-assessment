const {
	create,
	readAll,
	readOne,
	update,
	deleteAll,
} = require("../service/book.service");
const Book = require("../entity/book.schema");

const addBook = async (req, res) => {
	if (!Object.keys(req.body).length) {
		res.status(400).json({
			message: "Request Body Cannot be Empty",
		});
	}

	const { title, description, discount, price } = req.body;
	// create a record in db
	const book = await create({
		title,
		description,
		discount,
		coverImage: req.file.path,
		price,
	});
	if (book.error) {
		res.status(500).json({
			message: book.error,
		});
	}
	res.status(201).json({
		message: `New book added`,
	});
};

const getAllBooks = async (req, res) => {
	const { page = 1, limit = 10 } = req.query;
	console.log("req quert", req.query);
	const books = await readAll(page, limit);
	const count = await Book.countDocuments();
	if (books.error) {
		res.status(500).json({
			message: error.message,
			books: books.data,
		});
	}
	res.status(200).json({
		message: "success",
		books: books.data,
		totalPages: Math.ceil(count / limit),
		currentPage: page,
	});
};

/**
 *
 * @param {bookID} req
 * @param {one book data} res
 */
const getOneBook = async (req, res) => {
	let id = req.params.bookID;
	const book = await readOne(id);
	if (book.error) {
		res.status(500).json({
			message: book.error,
			books: book.data,
		});
	}
	res.status(200).json({
		message: "success",
		book: book.data,
	});
};

const updateBook = async (req, res) => {
	let id = req.params.bookID;
	if (!Object.keys(req.body).length) {
		res.status(400).json({
			message: "Request body cannot be empty",
			book: null,
		});
	}

	const book = await update(id, req.body);
	if (book.error) {
		res.status(500).json({
			message: book.error,
			book: book.data,
		});
	}
	res.status(200).json({
		message: "success",
		book: book.data,
	});
};

const deleteBook = async (req, res) => {
	let id = req.params.bookID;
	const isDeleted = await deleteOne(id);
	if (isDeleted.error) {
		res.status(500).json({
			message: isDeleted.error,
		});
	}
	res.status(200).json({
		message: "Deleted Successfully",
	});
};

const deleteAllBooks = async (req, res) => {
	const isDeleted = await deleteAll(req);
	if (isDeleted.error) {
		res.status(500).json({
			message: isDeleted.error,
		});
	}
	res.status(200).json({
		message: "Deleted Successfully",
	});
};

module.exports = {
	addBook,
	getAllBooks,
	getOneBook,
	updateBook,
	deleteAllBooks,
	deleteBook,
};
