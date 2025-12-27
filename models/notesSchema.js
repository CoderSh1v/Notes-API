import mongoose from "mongoose";

const schema =new mongoose.Schema({
    title : {type : String, required: [true,'Title is Required'], trim : true,minlength:1,lowercase: true },
    userId :{type :mongoose.Schema.Types.ObjectId,ref: "User",required :true}
},
{timestamps:true}
)

schema.index(
  { userId: 1, title: 1 },
  { unique: true }
)
schema.index(
  {userId:1, createdAt:-1},
  {unique:true}
)
export const notes = mongoose.model('Note',schema)
