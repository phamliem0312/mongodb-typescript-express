import { model, Schema } from "mongoose";

const userSchema = new Schema({
    id: { index: true, type: String },
    username: { unique: true, type: String },
    password: { type: String },
    role: { type: String },
    email: { type: String },
    createdAt: { type: String }
});

export const userModel = model('Users', userSchema);