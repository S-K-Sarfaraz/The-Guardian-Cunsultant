"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

function ExpensesScreen({ params }) {
    // Properly unwrap the params promise using React.use()
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState(null);

    const [expenseList, setExpenseList] = useState([]);

    const route= useRouter()

    useEffect(() => {
        if (user) {
            getBudgetInfo();
        }
    }, [id, user]);

    /**
     * Get Budget Info
     */

    const getBudgetInfo = async () => {
        try {
            const result = await db
                .select({
                    ...getTableColumns(Budgets),
                    totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                    totalItems: sql`count(${Expenses.id})`.mapWith(Number),
                })
                .from(Budgets)
                .leftJoin(Expenses, eq(Expenses.budgetId, Budgets.id))
                .where(
                    eq(
                        Budgets.createdBy,
                        user?.primaryEmailAddress?.emailAddress
                    )
                )
                .where(eq(Budgets.id, id))
                .groupBy(Budgets.id);

            setBudgetInfo(result[0]);
            getExpensesList();
        } catch (error) {
            console.error("Error fetching budget info:", error);
        }
    };

    /**
     * Get Latest Expenses
     */

    const getExpensesList = async () => {
        try {
            const result = await db
                .select()
                .from(Expenses)
                .where(eq(Expenses.budgetId, id))
                .orderBy(desc(Expenses.id));
            setExpenseList(result);
            // console.log(result);
        } catch (error) {
            console.error("Error fetching expenses list:", error);
        }
    };

    // Delete Budget
    const deleteBudger = async () => {
        const deleteExpenseResult = await db
            .delete(Expenses)
            .where(eq(Expenses.budgetId, id))
            .returning();

        if (deleteExpenseResult) {
            const result = await db
                .delete(Budgets)
                .where(eq(Budgets.id, id))
                .returning();
            if (result) {
                toast.success("Budget deleted successfully.");
                route.replace("/dashboard/budgets");
            }
        }
    };

    return (
        <div className="p-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Expenses</h2>

                <div className="flex gap-2 items-center">
                    <EditBudget 
                        budgetInfo={budgetInfo}
                        refreshData={() => getBudgetInfo()}
                    />
                    {/* Alert Dialog for the Deleetion of the Budget */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="flex gap-2" variant="destructive">
                                <Trash2 />
                                Delete Budget
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your budget from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteBudger()}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
                )}
                {/* Use the unwrapped id here */}
                <AddExpense
                    budgetId={id}
                    user={user}
                    refershData={() => getBudgetInfo()}
                />
            </div>
            <div className="mt-4">
                <h2 className="font-bold text-2xl mt-10">Latest Expenses</h2>
                <ExpenseListTable
                    expenseList={expenseList}
                    refreshData={() => getBudgetInfo()}
                />
            </div>
        </div>
    );
}

export default ExpensesScreen;
