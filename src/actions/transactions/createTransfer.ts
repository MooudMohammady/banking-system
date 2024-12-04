"use server";
import prisma from "@/lib/db";
import { Transaction } from "@prisma/client";

export const createTransfer = async (
  senderBankId: string,
  data: Omit<Transaction, "id" | "type" | "balance" | "createdAt">
) => {
  // Find the sender account
  const senderAccount = await prisma.account.findUnique({
    where: { id: senderBankId },
  });

  if (!senderAccount) {
    throw new Error("Sender account not found");
  }

  const senderBalance = senderAccount.balance;
  const transferAmount = data.amount;

  // Balance check
  if (senderBalance < transferAmount) {
    throw new Error("Insufficient balance");
  }

  // Database transaction
  const result = await prisma.$transaction(async (tx) => {
    // Reduce the value of the sender account
    const updatedSender = await tx.account.update({
      where: { id: senderBankId },
      data: { balance: senderBalance - transferAmount },
    });

    // Creating a new transaction
    const newTransaction = await tx.transaction.create({
      data: {
        ...data,
        senderBankId,
        type: "TRANSFER",
        amount: data.amount - data.amount * 2,
        balance: updatedSender.balance, // New Balance
      },
    });

    return newTransaction;
  });

  return result;
};
