"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { BankDropdown } from "./BankDropdown";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Account } from "@prisma/client";
import { createTransfer } from "@/actions/transactions/createTransfer";

const formSchema = z.object({
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(2, "Amount is too short"),
  senderBankId: z.string().min(1, "Please select a valid bank account"),
  receiverBankId: z
    .string()
    .min(8, "Please enter a valid IBAN")
    .regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/, "Invalid IBAN format"),
});

type PaymentTransferFormProps = {
  accounts: Account[];
};

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      senderBankId: "",
      receiverBankId: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const transaction = {
        name: data.name,
        amount: data.amount,
        senderBankId: data.senderBankId,
        receiverBankId: data.receiverBankId,
      };

      const newTransaction = await createTransfer(transaction.senderBankId, {
        name: transaction.name,
        amount: Number(transaction.amount),
        receiverBankId: transaction.receiverBankId,
        senderBankId: transaction.senderBankId,
      });

      if (newTransaction) {
        form.reset();
        router.push("/");
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex flex-col max-w-[850px]">
        <FormField
          control={form.control}
          name="senderBankId"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Select Source Bank
                  </FormLabel>
                  <FormDescription className="text-xs font-normal text-gray-600">
                    Select the bank account you want to transfer funds from
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Suspense fallback={null}>
                      <BankDropdown
                        accounts={accounts}
                        setValue={form.setValue}
                        otherStyles="!w-full"
                      />
                    </Suspense>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Transfer Note (Optional)
                  </FormLabel>
                  <FormDescription className="text-xs font-normal text-gray-600">
                    Please provide any additional information or instructions
                    related to the transfer
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Textarea
                      placeholder="Write a short note here"
                      className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-1 border-t border-gray-200 pb-5 pt-6">
          <h2 className="text-18 font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-base font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>

        <FormField
          control={form.control}
          name="receiverBankId"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <FormLabel className="text-sm w-full max-w-[280px] font-medium text-gray-700">
                  Please enter the recipient’s IBAN.
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="IBAN of the recipient's card."
                      className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-y border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-sm w-full max-w-[280px] font-medium text-gray-700">
                  Amount
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: 5.00"
                      className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="mt-5 flex w-full max-w-[850px] gap-3 border-gray-200 py-5">
          <Button
            type="submit"
            className="text-sm w-full font-semibold text-white shadow-md">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;
