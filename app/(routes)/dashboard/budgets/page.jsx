import React from 'react'
import BudgetList from './_components/BudgetList'

function Budgets() {
  return (
    <div className='p-10'>
      <h3 className='font-bold text-3xl'>My Budget List</h3>
      <BudgetList />
    </div>
  )
}

export default Budgets