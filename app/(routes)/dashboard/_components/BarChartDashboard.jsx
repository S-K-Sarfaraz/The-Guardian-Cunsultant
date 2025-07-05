"use client";
import React from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

function BarChartDashboard({ budgetList }) {
  // Prevent hydration issues by ensuring no undefined data is passed
  if (!budgetList || budgetList.length === 0) {
    return <p>Loading chart...</p>;
  }

  // Process the data: For each budget item, compute the allocated spend, remaining, and overspend.
  const processedData = budgetList.map((budget) => ({
    ...budget,
    // allocatedSpend is capped at the budget amount.
    allocatedSpend: budget.totalSpend > budget.amount ? budget.amount : budget.totalSpend,
    // remaining is any amount left in the budget (zero if overspent).
    remaining: budget.totalSpend > budget.amount ? 0 : budget.amount - budget.totalSpend,
    // overspend is any amount spent beyond the allocated budget.
    overspend: budget.totalSpend > budget.amount ? budget.totalSpend - budget.amount : 0,
  }));

  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <BarChart
        width={500}
        height={300}
        data={processedData}
        margin={{ top: 7 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/*
          First segment: Remaining budget.
          This section shows the unspent portion of the allocated budget.
        */}
        <Bar 
          dataKey="remaining" 
          stackId="a" 
          fill="#90caf9" 
          name="Remaining" 
        />
        {/*
          Second segment: Spent (within budget).
          This section shows spending up to the budget amount.
        */}
        <Bar 
          dataKey="allocatedSpend" 
          stackId="a" 
          fill="#8884d8" 
          name="Spent (within budget)" 
        />
        {/*
          Third segment: Overspend.
          This section shows extra spending beyond the budget.
        */}
        <Bar 
          dataKey="overspend" 
          stackId="a" 
          fill="#ff4d4d" 
          name="Overspend" 
        />
      </BarChart>
    </div>
  );
}

export default BarChartDashboard;
