"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import Transaction from "../database/models/transaction.model";
import { updateCredits } from "./user.actions";

export async function checkOutCredits(transaction: CheckoutTransactionParams) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const amount = Number(transaction.amount) * 100;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: amount,
                    product_data: {
                        name: transaction.planName,
                    },
                },
                quantity: 1,
            },
        ],
        metadata: {
            planId: transaction.planId,
            planName: transaction.planName,
            credits: transaction.credits,
            buyerId: transaction.buyerId,
        },
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
    });

    redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
    try {
        await connectToDatabase();

        const newTransaction = await Transaction.create({
            ...transaction,
            buyer: transaction.buyerId,
        });

        await updateCredits(
            transaction.buyerId,
            transaction.credits,
            transaction.planId
        );

        return JSON.parse(JSON.stringify(newTransaction));
    } catch (error) {
        handleError(error);
    }
}
