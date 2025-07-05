"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import dynamic from "next/dynamic";
import BudgetItem from "./budgets/_components/BudgetItem";

// Disable SSR for BarChartDashboard to prevent hydration issues
const BarChartDashboard = dynamic(() => import("./_components/BarChartDashboard"), { ssr: false });

export default function DashboardPage() {
    const { user } = useUser();
    const [budgetList, setBudgetList] = useState([]);
    const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
        if (user) {
            getBudgetList();
        }
    }, [user]);

    const getBudgetList = async () => {
        const result = await db
            .select({
                ...getTableColumns(Budgets),
                totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                totalItems: sql`count(${Expenses.id})`.mapWith(Number),
            })
            .from(Budgets)
            .leftJoin(Expenses, eq(Expenses.budgetId, Budgets.id))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id));

        setBudgetList(result);
        getAllExpenses();
    };


    const getAllExpenses= async () => {
        const result = await db.select({
            id:Expenses.id,
            name:Expenses.name,
            amount:Expenses.amount,
            createdAt:Expenses.createdAt
        }).from(Budgets)
        .rightJoin(Expenses, eq(Expenses.budgetId, Budgets.id))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.createdAt));

        
    }

    return (
        <div className="p-8">
            <h2 className="font-bold text-3xl">Hi! {user?.fullName} ✌️</h2>
            <p className="text-gray-500">
                Here's what's happening with your money, let's manage your expenses.
            </p>
            <CardInfo budgetList={budgetList} />
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6">
                <div className="md:col-span-2">
                    {budgetList.length > 0 ? (
                        <BarChartDashboard budgetList={budgetList} />
                    ) : (
                        <p>Loading chart...</p>
                    )}
                </div>
                <div>
                  {budgetList.map((budget, index)=>(
                    <BudgetItem
                      budget={budget}
                      key={index}
                    />
                  ))}
                </div>
            </div>
        </div>
    );
}
