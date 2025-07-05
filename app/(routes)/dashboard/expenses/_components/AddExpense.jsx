import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { Trash2 } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refershData }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const addNewExpense = async () => {
        // Convert amount to number and validate
        const numericAmount = parseFloat(amount);
        if (numericAmount <= 0) {
            toast.error("Please enter a valid positive amount");
            return;
        }

        const result = await db.insert(Expenses).values({
            name: name,
            amount: numericAmount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/yyyy')
        }).returning({ insertedId: Budgets.id });

        if (result) {
            refershData()
            toast.success("Expense added successfully.");
            setName('');
            setAmount('');
        }
    };

    return (
        <div className="border rounded-lg p-5">
            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-2">
                <label className="font-medium text-black my-1 block">
                    Expense Name *
                </label>
                <Input
                    placeholder="e.g. Groceries"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mt-4">
                <label className="font-medium text-black my-1 block">
                    Expense Amount *
                </label>
                <Input
                    type="number"
                    step="1"
                    min="1"
                    placeholder="e.g. ₹1000"
                    value={amount}
                    onKeyDown={(e) => {
                        // Prevent minus key
                        if (e.key === '-' || e.key === 'Subtract') {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        // Remove any negative characters and leading zeros
                        let value = e.target.value.replace(/-/g, '');
                        
                        // Convert to number and back to string to remove invalid characters
                        const numericValue = parseFloat(value);
                        if (!isNaN(numericValue)) {
                            value = numericValue.toString();
                        }
                        
                        setAmount(value);
                    }}
                />
            </div>
            <Button 
                onClick={addNewExpense} 
                disabled={!name || !amount || parseFloat(amount) <= 0} 
                className="mt-3 w-full"
            >
                Add New Expense
            </Button>
        </div>
    );
}

export default AddExpense;