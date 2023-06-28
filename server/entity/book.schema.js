const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	discount: {
		type: Number,
		required: true,
	},
	coverImage: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});
// Export model
module.exports = mongoose.model("Book", bookSchema);
