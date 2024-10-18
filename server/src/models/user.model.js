import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({}, { timestamps: true });

// pre middlewares will be written here

const User = new mongoose.model('users', userSchema);
