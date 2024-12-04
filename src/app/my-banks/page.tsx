"use client";

import { getAccountList } from "@/actions/account/getAccountList";
import CreateBankAccountDialog from "@/components/CreateBankAccountDialog";
import { Button } from "@/components/ui/button";
import { formatAmount } from "@/lib/utils";
import { Account } from "@prisma/client";
import { Add } from "iconsax-react";
import React, { useState } from "react";

export default function MyBanks() {
  const [accountList, setAccountList] = useState<Account[]>();
  const fetchAccounts = async () => {
    const accounts = await getAccountList();
    setAccountList(accounts);
  };

  React.useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <main className="flex flex-col flex-1 gap-5 px-3">
      <div className="flex justify-between items-center pt-5">
        <h2 className="text-3xl font-bold">Your Banks</h2>
        <CreateBankAccountDialog onSuccess={fetchAccounts}>
          <Button type="submit" className="flex items-center gap-1">
            Add Bank <Add className="stroke-white" />
          </Button>
        </CreateBankAccountDialog>
      </div>
      <ul className="flex flex-wrap max-md:flex-col gap-5">
        {accountList && accountList.length > 0 ? (
          accountList.map((account, idx) => (
            <li
              key={idx}
              className="flex justify-between gap-5 items-center border rounded-lg p-5">
              <div className="flex flex-col">
                <span className="font-semibold text-xl">{account.name}</span>
                <span className="opacity-70">{account.iban}</span>
              </div>
              <span className="font-bold text-lg">
                {formatAmount(account.balance)}
              </span>
            </li>
          ))
        ) : (
          <span>You have not connected any bank accounts.</span>
        )}
      </ul>
    </main>
  );
}
