import { Book } from "../../database/models/book.model.js"; // Import the Book model

// Controller to add a new book to the database
const addBook = async (req, res) => {
    try {
        let book = await Book.insertMany(req.body); // Insert new book(s) from request body

        // Update the corresponding author with the new book's ID
        const author = await Author.findByIdAndUpdate(
            req.body.author,
            { $push: { books: book[0]._id } }, // Push the new book's ID into the author's books array
            { new: true } // Return the updated author
        );

        console.log(author); // Log the updated author for debugging

        // Populate author details in the book object before sending the response
        book = await Book.findById(book[0]._id).populate('author', 'name -_id');
        res.status(201).json({ message: "success", book }); // Respond with success message and book data
    } catch (error) {
        res.status(500).json({ message: "error adding book" }); // Handle error and respond
        console.error(error);
    }
};

// Controller to retrieve all books with optional filtering
const getAllBooks = async (req, res) => {
    try {
        // Create filters based on query parameters
        const title = req.query.title ? { title: new RegExp(req.query.title, 'i') } : {}; // Filter by title if provided
        const author = req.query.author ? { author: new RegExp(req.query.author, 'i') } : {}; // Filter by author if provided
        const query = { ...title, ...author }; // Combine filters

        // Retrieve books based on query filters and populate author details
        const books = await Book.find(query).populate('author', 'name -_id');
        res.status(200).json({ message: "success", books }); // Respond with success message and books data
    } catch (error) {
        res.status(500).json({ message: "error fetching books" }); // Handle error and respond
        console.error(error);
    }
};

// Controller to retrieve a specific book by ID
const getBook = async (req, res) => {
    try {
        // Find book by ID and populate author details
        const book = await Book.findById(req.params.id).populate('author', 'name -_id');
        if (!book) {
            return res.status(404).json({ error: 'Book not found' }); // Handle case where book is not found
        }
        res.status(200).json({ message: "success", book }); // Respond with book data
    } catch (error) {
        res.status(500).json({ message: "error fetching book" }); // Handle error and respond
        console.error(error);
    }
};

// Controller to update an existing book by ID
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body); // Update book with new data
        if (!book) {
            return res.status(404).json({ error: 'Book not found' }); // Handle case where book is not found
        }
        res.status(200).json({ message: "success", book }); // Respond with updated book data
    } catch (error) {
        res.status(500).json({ message: "error updating book" }); // Handle error and respond
        console.error(error);
    }
};

// Controller to delete a book by ID
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id); // Delete book by ID
        if (!book) {
            return res.status(404).json({ error: 'Book not found' }); // Handle case where book is not found
        }
        res.status(200).json({ message: "success", book }); // Respond with deleted book data
    } catch (error) {
        res.status(500).json({ message: "error deleting book" }); // Handle error and respond
        console.error(error);
    }
};

// Export all controller functions for use in routes
export { addBook, getAllBooks, getBook, updateBook, deleteBook };
