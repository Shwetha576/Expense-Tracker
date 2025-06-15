import mongoose, { Schema, model } from 'mongoose';

const IncomeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    incomeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Income', required: true },
    icon: { type: String },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

export default model('Income', IncomeSchema);
// This code defines a Mongoose schema for an Income model in a Node.js application.