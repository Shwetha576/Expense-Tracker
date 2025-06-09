import { model, Schema } from "mongoose";

const ExpenseSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String},
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true
});

export default model("Expense", ExpenseSchema);