import { Router } from "express";
import { addBook, deleteBook, getAllBooks, getBook, updateBook } from "./book.controller.js";

const booksRouter = Router();

// Route to add a new book
booksRouter.post('/add-book', addBook);
// Route to get all books
booksRouter.get('/get-all-books', getAllBooks);
// Route to get, update, or delete a book by ID
booksRouter.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

// Export the books router for use in the main application
export default booksRouter;
