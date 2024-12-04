import { getTransactionList } from "@/actions/transactions/getTransactionList";
import TransactionsTable from "@/components/TransactionTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrangeHorizontal } from "iconsax-react";
import Link from "next/link";
import React from "react";

export default async function TransactionHistory() {
  const transactions = await getTransactionList();

  return (
    <main className="flex flex-col flex-1 gap-5 px-3">
      <div className="flex justify-between items-center pt-5 ">
        <h2 className="text-3xl font-bold">Transaction History</h2>
        <Link href={"/payment-transfer"}>
          <Button className="flex items-center gap-1">
            Transfer <ArrangeHorizontal className="stroke-white" />
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transactions history</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable transactions={transactions} />
        </CardContent>
      </Card>
    </main>
  );
}
