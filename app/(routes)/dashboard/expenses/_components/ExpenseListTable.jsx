import React, { useState, useEffect } from "react";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

// Import shadcn/ui Dialog components (adjust the paths as needed)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

function ExpenseListTable({ expenseList, refreshData }) {
  // State for deletion
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // State for editing
  const [editExpense, setEditExpense] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");

  // Delete expense function
  const deleteExpense = async (expense) => {
    try {
      const result = await db.delete(Expenses).where(eq(Expenses.id, expense.id));
      if (result) {
        toast.success("Expense deleted successfully.");
        refreshData();
      }
    } catch (error) {
      toast.error("Failed to delete expense.");
    }
  };

  // Called when the user confirms deletion in the modal
  const handleDeleteConfirmation = async () => {
    if (!selectedExpense) return;
    await deleteExpense(selectedExpense);
    setDeleteOpen(false);
    setSelectedExpense(null);
  };

  // Edit expense function
  const updateExpense = async (expenseId, updatedData) => {
    try {
      const result = await db
        .update(Expenses)
        .set(updatedData)
        .where(eq(Expenses.id, expenseId));
      if (result) {
        toast.success("Expense updated successfully.");
        refreshData();
      }
    } catch (error) {
      toast.error("Failed to update expense.");
    }
  };

  // Called when the edit form is submitted
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editExpense) return;
    const updatedData = {
      name: editName,
      amount: editAmount,
    };
    await updateExpense(editExpense.id, updatedData);
    setEditOpen(false);
    setEditExpense(null);
  };

  // When an expense is selected for editing, prefill the form fields
  useEffect(() => {
    if (editExpense) {
      setEditName(editExpense.name);
      setEditAmount(editExpense.amount);
    }
  }, [editExpense]);

  return (
    <div className="mt-3">
      {/* Table view for screens sm and above */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-5 bg-slate-300 p-2">
          <h2 className="font-bold">Name</h2>
          <h2 className="font-bold">Amount</h2>
          <h2 className="font-bold">Date</h2>
          <h2 className="font-bold col-span-2 text-center">Actions</h2>
        </div>
        {expenseList.map((expense) => (
          <div
            key={expense.id}
            className="grid grid-cols-5 bg-slate-100 border p-2 items-center"
          >
            <div>{expense.name}</div>
            <div>{expense.amount}</div>
            <div>{expense.createdAt}</div>
            <div className="flex justify-center">
              <Edit
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setEditExpense(expense);
                  setEditOpen(true);
                }}
              />
            </div>
            <div className="flex justify-center">
              <Trash2
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  setSelectedExpense(expense);
                  setDeleteOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view for screens smaller than sm */}
      <div className="sm:hidden">
        {expenseList.map((expense) => (
          <div key={expense.id} className="bg-slate-100 border rounded-md p-4 mb-3">
            <div className="mb-2">
              <span className="font-bold">Name: </span>
              {expense.name}
            </div>
            <div className="mb-2">
              <span className="font-bold">Amount: </span>
              {expense.amount}
            </div>
            <div className="mb-2">
              <span className="font-bold">Date: </span>
              {expense.createdAt}
            </div>
            <div className="flex justify-end space-x-4">
              <Edit
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setEditExpense(expense);
                  setEditOpen(true);
                }}
              />
              <Trash2
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  setSelectedExpense(expense);
                  setDeleteOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal using shadcn/ui */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this expense? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button
                className="btn btn-secondary px-3 py-1 rounded-md border border-black"
                onClick={() => {
                  setDeleteOpen(false);
                  setSelectedExpense(null);
                }}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              className="btn btn-destructive bg-red-500 text-white px-3 py-1 rounded-md border border-black"
              onClick={handleDeleteConfirmation}
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Expense Modal using shadcn/ui */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>
              Modify the details of your expense and click "Save" to update.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-1"
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <button
                  type="button"
                  className="btn btn-secondary px-3 py-1 rounded-md border border-black"
                  onClick={() => {
                    setEditOpen(false);
                    setEditExpense(null);
                  }}
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="submit"
                className="btn btn-primary bg-green-500 text-white px-3 py-1 rounded-md border border-black"
              >
                Save
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ExpenseListTable;
