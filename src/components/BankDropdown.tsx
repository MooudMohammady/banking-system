/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { formUrlQuery, formatAmount } from "@/lib/utils";
import { Account } from "@prisma/client";
import { UseFormSetValue } from "react-hook-form";
import { Card as CardIcon } from "iconsax-react";

type BankDropdownProps = {
  accounts: Account[];
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
};

export const BankDropdown = ({
  accounts = [],
  setValue,
  otherStyles,
}: BankDropdownProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState(accounts[0]);

  const handleBankChange = (id: string) => {
    const account = accounts.find((account) => account.id === id)!;

    setSelected(account);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });
    router.push(newUrl, { scroll: false });

    if (setValue) {
      setValue("senderBankId", id);
    }
  };

  return (
    <Select onValueChange={(value) => handleBankChange(value)}>
      <SelectTrigger
        className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <CardIcon className="stroke-foreground" size={20} />
        <p className="line-clamp-1 w-full text-left">{selected.name}</p>
      </SelectTrigger>
      <SelectContent
        className={`w-full bg-white md:w-[300px] ${otherStyles}`}
        align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">
            Select a bank to display
          </SelectLabel>
          {accounts.map((account: Account) => (
            <SelectItem
              key={account.id}
              value={account.id}
              className="cursor-pointer border-t">
              <div className="flex flex-col ">
                <p className="text-16 font-medium">{account.name}</p>
                <p className="text-14 font-medium text-blue-600">
                  {formatAmount(account.balance)}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
