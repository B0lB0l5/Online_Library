import mongoose from "mongoose";

// Connect to MongoDB database
const db = mongoose.connect('mongodb://127.0.0.1:27017/libraryDb').then(() => {
    console.log("Connected to database"); // Log success message on connection
}).catch((error) => {
    console.error(error); // Log error message if connection fails
});

// Export the database connection for use in other modules
export { db };
