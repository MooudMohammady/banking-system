"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createAccount = async (data: Prisma.AccountCreateInput) => {
  return await prisma.account.create({
    data: { ...data, balance: Number(data.balance) },
  });
};
