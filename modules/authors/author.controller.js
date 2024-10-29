import { Author } from "../../database/models/author.model.js";

// Controller to add a new author to the database
const addAuthor = async (req, res) => {
    try {
        const author = await Author.insertMany(req.body); // Insert new author(s) from request body
        res.status(201).json({ message: "success", author }); // Respond with success message and author data
    } catch (error) {
        res.status(500).json({ message: "error adding author" }); // Handle error and respond
        console.error(error);
    }
};

// Controller to get all authors from the database with optional filtering
const getAllAuthors = async (req, res) => {
    try {
        const name = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {}; // Filter by name if provided
        const bio = req.query.bio ? { bio: new RegExp(req.query.bio, 'i') } : {}; // Filter by bio if provided
        const query = { ...name, ...bio }; // Combine filters

        const authors = await Author.find(query).populate("books", "title -_id"); // Retrieve authors with their books
        res.status(200).json({ message: "success", authors }); // Respond with authors data
    } catch (error) {
        res.status(500).json({ message: "error fetching authors" }); // Handle error and respond
        console.error(error);
    }
};

// Controller to get a specific author by ID
const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('books', "title publishedDate -_id"); // Find author by ID and populate books
        if (!author) {
            return res.status(404).json({ error: 'Author not found' }); // Handle case where author is not found
        }
        res.status(200).json({ message: "success", author }); // Respond with author data
    } catch (error) {
        res.status(500).json({ message: "error fetching author" }); // Handle error and respond
        console.error(error);
    }
};

// Controller to update an existing author by ID
const updateAuthorById = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body); // Update author with new data
        if (!author) {
            return res.status(404).json({ error: 'Author not found' }); // Handle case where author is not found
        }
        res.status(200).json({ message: "success", author }); // Respond with updated author data
    } catch (error) {
        res.status(500).json({ message: "error updating author" }); // Handle error and respond
        console.error(error);
    }
};

// Controller to delete an author by ID
const deleteAuthorById = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id); // Delete author by ID
        if (!author) {
            return res.status(404).json({ error: 'Author not found' }); // Handle case where author is not found
        }
        res.status(200).json({ message: "success", author }); // Respond with deleted author data
    } catch (error) {
        res.status(500).json({ message: "error deleting author" }); // Handle error and respond
        console.error(error);
    }
};

// Export all controller functions for use in routes
export { addAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById };
