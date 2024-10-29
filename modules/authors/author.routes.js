import { Router } from "express";
import { addAuthor, deleteAuthorById, getAllAuthors, getAuthorById, updateAuthorById } from "./author.controller.js";

const authorsRouter = Router();

// Route to add a new author
authorsRouter.post('/add-author', addAuthor);
// Route to get all authors
authorsRouter.get("/get-all-authors", getAllAuthors);
// Route to get, update, or delete an author by ID
authorsRouter.route("/:id").get(getAuthorById).patch(updateAuthorById).delete(deleteAuthorById);

// Export the authors router for use in the main application
export default authorsRouter;
