import mongoose, { model, Schema } from "mongoose";

const ExpenseSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
    expenseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense', required: true },
    icon: { type: String},
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true
});

export default model("Expense", ExpenseSchema);