import { Schema, model } from 'mongoose';

import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String , default: '' },
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export default model('User', userSchema);
// This code defines a Mongoose schema for a User model in a Node.js application.