import { getAccountList } from "@/actions/account/getAccountList";
import PaymentTransferForm from "@/components/PaymentTransfer";
import React from "react";

export default async function PaymentTransfer() {
  const accounts = await getAccountList();
  return (
    <main className="flex flex-col gap-5 flex-1 px-3">
      <div className="flex flex-col pt-5">
        <h2 className="text-3xl font-bold">Payment Transfer</h2>
        <p className="text-sm opacity-70">
          Please provide any specific details or notes related to the payment
          transfer
        </p>
      </div>
      <PaymentTransferForm accounts={accounts} />
    </main>
  );
}
