"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { HambergerMenu } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px] flex">
      <Sheet>
        <SheetTrigger>
          <HambergerMenu className="cursor-pointer size-7 stroke-foreground" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <SheetHeader>
            <SheetTitle>
              <Link
                href="/"
                className="cursor-pointer flex items-center gap-1 px-4">
                <h1 className="text-2xl font-ibm-plex-serif font-bold text-black-1">
                  Banking System
                </h1>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "flex gap-3 items-center p-4 rounded-lg w-full max-w-60",
                          {
                            "bg-primary": isActive,
                          }
                        )}>
                        <item.icon
                          size={20}
                          className={cn("stroke-foreground", {
                            "brightness-[3] stroke-white": isActive,
                          })}
                        />
                        <p
                          className={cn(
                            "text-base font-semibold text-foreground",
                            {
                              "text-white": isActive,
                            }
                          )}>
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                USER
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
