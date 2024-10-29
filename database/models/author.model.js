import mongoose, { Schema, model } from 'mongoose';

// Schema definition for the Author model
const schema = new Schema({
    name: { type: String, required: true }, // Author's name, mandatory field
    bio: { type: String },                   // Author's biography, optional field
    birthDate: { type: Date },               // Author's birth date, optional field
    books: [{ type: mongoose.Types.ObjectId, ref: 'Book' }] // References to books written by the author
}, {
    versionKey: false // Disable the __v field in the document
});

// Export the Author model based on the defined schema
export const Author = model('Author', schema);
