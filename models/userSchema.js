import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const schema = new mongoose.Schema({
    email: {
        type: String, required: [true, 'email is Required'], trim: true, lowercase: true, unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
    },
    password: { type: String, required: true, minlength: 8 }
})

schema.pre("save", async function (next){
    if(!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password,10);
})

schema.methods.comparePassword = async function (pswd) {
  return await bcrypt.compare(pswd, this.password);
};

export const User = mongoose.model('User', schema)
