"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <h1 className="text-xl font-bold">Banking System</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
                { "bg-primary": isActive }
              )}>
              <div className="relative size-6">
                <item.icon
                  className={cn("stroke-foreground", {
                    "brightness-[3] stroke-white": isActive,
                  })}
                />
              </div>
              <p
                className={cn(
                  "text-base font-semibold text-foreground max-xl:hidden",
                  { "!text-white": isActive }
                )}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default Sidebar;
