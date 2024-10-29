import express from 'express';
import booksRouter from './modules/books/book.routes.js';
import "./database/dbconnection.js"; // Connect to the database
import authorsRouter from './modules/authors/author.routes.js';

const app = express();
const port = 3000; // Port number for the server

app.use(express.json()); // Middleware to parse JSON request bodies

// Register routes for books and authors
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

// Start the server and log the listening message
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
