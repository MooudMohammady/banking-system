import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatAmount,
  formatDateTime,
  removeSpecialCharacters,
} from "@/lib/utils";
import { Account, Transaction } from "@prisma/client";
import { ArrangeHorizontal, DollarCircle } from "iconsax-react";
import Link from "next/link";
import { Button } from "./ui/button";

type TransactionsTableProps = {
  transactions: (Transaction & { account: Account })[];
};

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-52">
        <ArrangeHorizontal className="stroke-foreground" size={50} />
        No transaction has been made.
        <Link href={"/payment-transfer"}>
          <Button className="flex items-center gap-1">
            <DollarCircle className="stroke-secondary" />
            First Transfer
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Table className="rounded-lg overflow-hidden">
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2 py-4">Transaction</TableHead>
          <TableHead className="px-2 py-4">Amount</TableHead>
          <TableHead className="px-2 py-4">Balance</TableHead>
          <TableHead className="px-2 py-4">Date</TableHead>
          <TableHead className="px-2 py-4">SenderCardName</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t) => {
          const amount = formatAmount(t.amount);

          return (
            <TableRow
              key={t.id}
              className={`${
                amount[0] === "-" ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"
              } hover:!bg-none border-b-DEFAULT`}>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-sm truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>

              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  amount[0] === "-" ? "text-[#f04438]" : "text-[#039855]"
                }`}>
                {amount}
              </TableCell>
              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  amount[0] === "-" ? "text-[#f04438]" : "text-[#039855]"
                }`}>
                {t.balance}
              </TableCell>

              <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(t.createdAt)).dateTime}
              </TableCell>

              <TableCell>{t.account.name}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
