import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title:  {
        type: String,
        required: true,
      },
    description: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",                             //Collection name
        required: true,
    },
    createAt: {
      type: Date,
      default:Date.now,
    },
  });

export const Task = mongoose.model("Task", userSchema);
