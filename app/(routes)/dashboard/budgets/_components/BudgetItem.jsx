"use client";
import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  // Use optional chaining and default values
  const id = budget?.id || "";
  const icon = budget?.icon || "";
  const name = budget?.name || "Unnamed Budget";
  const totalItems = budget?.totalItems || 0;
  const amount = budget?.amount || 0;
  const totalSpend = budget?.totalSpend || 0;

  const calculateProgressPerc = () => {
    // Avoid division by zero
    if (amount === 0) return 0;
    const perc = (totalSpend / amount) * 100;
    return perc.toFixed(2);
  };

  // Calculate the extra percentage when overspent.
  const extraPerc = () => {
    if (amount === 0) return 0;
    const extra = ((totalSpend - amount) / amount) * 100;
    return extra.toFixed(2);
  };

  return (
    <Link href={"/dashboard/expenses/" + id}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
              {icon}
            </h2>
            <div>
              <h2 className="font-bold">{name}</h2>
              <h2 className="text-sm text-gray-500">{totalItems} Items</h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">₹{amount}</h2>
        </div>
        <div className="mt-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs text-slate-400">₹{totalSpend} Spend</h2>
            <h2 className="text-xs text-slate-400">
              {totalSpend <= amount
                ? `₹${amount - totalSpend} Remaining`
                : `Overspent by ₹${totalSpend - amount}`}
            </h2>
          </div>
          {/* Progress bars container */}
          <div className="w-full">
            {/* Main progress bar container */}
            <div className="w-full bg-stone-300 h-2 rounded-full">
              <div
                className="bg-primary h-2 rounded-full"
                style={{
                  width: totalSpend > amount
                    ? "100%"
                    : `${calculateProgressPerc()}%`
                }}
              ></div>
            </div>
            {/* Overspend progress bar container - only visible if overspent */}
            {totalSpend > amount && (
              <div className="w-full bg-stone-300 h-2 rounded-full mt-1">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${extraPerc()}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
