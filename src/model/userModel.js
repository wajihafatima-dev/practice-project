// /models/User.js
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }); 

// Create the User model
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
