import mongoose, { Schema, model } from 'mongoose';

// Schema definition for the Book model
const schema = new Schema({
    title: { type: String, required: true }, // Book title, mandatory field
    content: { type: String, required: true }, // Content of the book, mandatory field
    author: { type: mongoose.Types.ObjectId, ref: 'Author', required: true }, // Reference to the Author model, mandatory field
    publishedDate: { type: Date, default: Date.now } // Date when the book was published, defaults to current date
}, {
    versionKey: false // Disable the __v field in the document
});

// Export the Book model based on the defined schema
export const Book = model('Book', schema);
