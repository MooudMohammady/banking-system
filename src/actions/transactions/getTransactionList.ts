"use server";
import prisma from "@/lib/db";

export const getTransactionList = async () => {
  const data = await prisma.transaction.findMany({
    include: { account: true },
  });
  return data;
};
