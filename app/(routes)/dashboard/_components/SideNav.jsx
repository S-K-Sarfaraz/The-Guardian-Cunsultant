"use client";
import { UserButton } from "@clerk/nextjs";
import {
    HandCoins,
    LayoutPanelLeft,
    ReceiptIndianRupee,
    ShieldPlus,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutPanelLeft,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Budget",
            icon: HandCoins,
            path: "/dashboard/budgets",
        },
        {
            id: 3,
            name: "Expenses",
            icon: ReceiptIndianRupee,
            path: "/dashboard/expenses",
        },
        {
            id: 4,
            name: "Upgrade",
            icon: ShieldPlus,
            path: "/dashboard/upgrade",
        },
    ];

    const path = usePathname(); // Get the current pathname

    return (
        <div className="h-screen border shadow-sm p-3">
            {/* Header Section */}
            <Link href="/" aria-label="Home">
                <div className="flex flex-row justify-between items-center pb-5 cursor-pointer">
                        <Image
                            src="/logo.png"
                            alt="Finance Advisor Logo"
                            width={43}
                            height={43}
                            priority
                        />
                        <p className="text-[23px] tracking-tight font-bold text-[#673ab7]">
                            Finance Advisor
                        </p>
                </div>
            </Link>

            {/* Navigation Menu */}
            <div className="mt-5">
                {menuList.map((menu) => (
                    <Link key={menu.id} href={menu.path} aria-label={menu.name}>
                        <h2
                            className={`flex gap-2 mb-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-full hover:text-primary hover:bg-purple-200 transition-all ${
                                path === menu.path && "text-primary bg-purple-200"
                            }`}
                        >
                            <menu.icon className="text-lg" />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>

            {/* Profile Section */}
            <div className="fixed bottom-10 p-3 flex gap-2 items-center hover:text-primary hover:bg-purple-200 rounded-full w-auto transition-all">
                <UserButton />
                <span>Profile</span>
            </div>
        </div>
    );
}

export default SideNav;
