"use server";
import prisma from "@/lib/db";

export const getAccountList = async () => {
  const data = await prisma.account.findMany();
  return data;
};
