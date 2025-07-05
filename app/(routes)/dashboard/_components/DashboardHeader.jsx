import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='p-3 border-b shadow-sm flex flex-row justify-between'>
        <div>
            search Button 
        </div>
        <div>
            <UserButton/>
        </div>
    </div>
  )
}

export default DashboardHeader