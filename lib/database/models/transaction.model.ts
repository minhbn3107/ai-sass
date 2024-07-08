import { Schema, model, models } from "mongoose";
import { number } from "zod";

const TransactionSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    stripeId: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    planId: {
        type: Number,
    },
    planName: {
        type: String,
    },
    credits: {
        type: Number,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Transaction =
    models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
