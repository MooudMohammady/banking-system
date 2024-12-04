import { getAccountList } from "@/actions/account/getAccountList";
import { getTransactionList } from "@/actions/transactions/getTransactionList";
import TransactionChart from "@/components/TransactionChart";
import TransactionsTable from "@/components/TransactionTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";
import { Add } from "iconsax-react";
import Link from "next/link";

export default async function Home() {
  const transactions = await getTransactionList();
  const accountList = await getAccountList();

  const totalBalance = accountList.reduce(
    (acc, { balance }) => acc + balance,
    0
  );
  console.log("hi", totalBalance);

  return (
    <main className="flex flex-col flex-1 gap-5 px-3">
      <h2 className="pt-5 text-3xl font-bold">Dashboard</h2>
      <div className="flex gap-5 max-md:flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Balance
              <span>{formatAmount(totalBalance)}</span>
            </CardTitle>
            <CardContent className="p-0">
              <TransactionChart transactions={transactions} />
            </CardContent>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Bank Accounts
              <Link href={"/my-banks"}>
                <Button size={"icon"} className="size-8">
                  <Add className="stroke-white" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {accountList.length > 0 ? (
                accountList.map((account, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between gap-5 items-center border rounded-lg p-3">
                    <div className="flex flex-col">
                      <span className="font-semibold">{account.name}</span>
                      <span className="text-sm opacity-70">{account.iban}</span>
                    </div>
                    <span className="font-bold">
                      {formatAmount(account.balance)}
                    </span>
                  </li>
                ))
              ) : (
                <span>You have not connected any bank accounts.</span>
              )}
            </ul>
          </CardContent>
        </Card>
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
