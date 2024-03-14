import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    image: String,
    age: Number,
    status: String,
});

let UserModel;

try {
    // Trying to get the existing model to prevent OverwriteModelError
    UserModel = mongoose.model("Student");
} catch (error) {
    // If the model doesn't exist, create it
    UserModel = mongoose.model("Student", schema);
}

export default UserModel;
