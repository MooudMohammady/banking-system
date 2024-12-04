"use client";
import { Account, Transaction } from "@prisma/client";
import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { formatDateTime } from "@/lib/utils";

type TransactionsChartProps = {
  transactions: (Transaction & { account: Account })[];
};

export default function TransactionChart({
  transactions,
}: TransactionsChartProps) {
  const chartData = transactions.map((t) => ({
    balance: t.balance,
    date: formatDateTime(t.createdAt).dateOnly,
  }));

  const chartConfig = {
    date: {
      label: "Date",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="flex-1">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 35,
          right: 35,
        }}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <Area
          dataKey={"balance"}
          type={"bump"}
          fillOpacity={0.4}
          className="fill-primary stroke-primary"
        />
      </AreaChart>
    </ChartContainer>
  );
}
