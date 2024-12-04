import {
  DollarCircle,
  Home2,
  MoneyRecive,
  MoneySend,
  ReceiptText,
} from "iconsax-react";

export const sidebarLinks = [
  {
    icon: Home2,
    route: "/",
    label: "Home",
  },
  {
    icon: DollarCircle,
    route: "/my-banks",
    label: "My Banks",
  },
  {
    icon: ReceiptText,
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    icon: MoneySend,
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
  {
    icon: MoneyRecive,
    route: "/Deposit",
    label: "Deposit",
  },
];
