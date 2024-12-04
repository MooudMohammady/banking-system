import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create an account
  const account = await prisma.account.create({
    data: {
      name: "John Doe",
      iban: "DE89370400440532013000",
      balance: "1000",
    },
  });

  // Creating two transactions
  await prisma.transaction.createMany({
    data: [
      {
        name: "Deposit",
        type: "DEPOSIT",
        amount: "500",
        balance: "1500",
        senderBankId: account.id,
        receiverBankId: account.id,
      },
      {
        name: "Withdrawal",
        type: "WITHDRAW",
        amount: "-200",
        balance: "1300",
        senderBankId: account.id,
        receiverBankId: account.id,
      },
      {
        name: "Withdrawal",
        type: "TRANSFER",
        amount: "-200",
        balance: "1300",
        senderBankId: account.id,
        receiverBankId: account.id,
      },
    ],
  });

  console.log("Seed data added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
