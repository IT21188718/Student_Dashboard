import mongoose from "mongoose";

const adminSchema =new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    Image:String
},{timestamps:true});



let admindb;

try {
    
    admindb = mongoose.model("admin");
} catch (error) {
    
    admindb = mongoose.model("admin", adminSchema);
}

export default admindb;

