'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { toast } from "sonner"
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'

function CreateBudget({ refreshData }) {
  const [emojiPicker, setEmojiPicker] = useState('😀')
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useUser();

  const onCreateBudget = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (!name || !amount) {
        toast.warning("Please fill all required fields")
        return false
      }

      const amountNumber = Number(amount.replace(/-/g, '')) // Remove any remaining hyphens
      if (isNaN(amountNumber) || amountNumber <= 0 || !Number.isInteger(amountNumber)) {
        toast.warning("Invalid amount. Please enter correct amount.")
        return false
      }

      const result = await db.insert(Budgets).values({
        name: name,
        amount: amountNumber,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiPicker
      }).returning({ insertedId: Budgets.id })

      if (result) {
        refreshData()
        toast.success("Budget created successfully!")
        setName('')
        setAmount('')
        setEmojiPicker('😀')
        return true
      }
    } catch (error) {
      console.error("Budget creation failed:", error)
      toast.error("Failed to create budget")
      return false
    } finally {
      setIsLoading(false);
    }
    return false
  }

  return (
    <div>
      <Dialog 
        open={isOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setName('')
            setAmount('')
            setEmojiPicker('😀')
          }
          setIsOpen(open)
        }}
      >
        <DialogTrigger asChild>
          <div className='bg-slate-100 p-10 h-[170px] rounded-md text-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-lg'>
            <h2 className='text-3xl'>+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription asChild>
              <div className="text-sm text-muted-foreground">
              <div className='mt-5 relative'>
                  <Button 
                    variant="outline" 
                    className='text-2xl'
                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  >
                    {emojiPicker}
                  </Button>
                  
                  {openEmojiPicker && (
                    <div className='absolute z-10 mt-2'>
                      <EmojiPicker
                        open={openEmojiPicker}
                        onEmojiClick={(e) => {
                          setEmojiPicker(e.emoji)
                          setOpenEmojiPicker(false)
                        }}
                      />
                    </div>
                  )}

                  <div className='mt-4'>
                    <label className='font-medium text-black my-1 block'>
                      Budget Name *
                    </label>
                    <Input 
                      placeholder='e.g. Home Budget'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className='mt-4'>
                    <label className='font-medium text-black my-1 block'>
                      Budget Amount *
                    </label>
                    <Input 
                      type="number"
                      step="1"
                      min="1"
                      placeholder='e.g. ₹5000'
                      value={amount}
                      onKeyDown={(e) => {
                        // Block minus key input
                        if (e.key === '-' || e.key === 'Subtract') {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        // Remove any negative characters
                        let value = e.target.value.replace(/-/g, '');
                        // Remove leading zeros if needed
                        if (value.length > 1 && value.startsWith('0')) {
                          value = value.replace(/^0+/, '');
                        }
                        setAmount(value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <Button
              disabled={!name || !amount || isLoading || Number(amount) <= 0}
              onClick={async () => {
                const success = await onCreateBudget()
                if (success) setIsOpen(false)
              }}
              className='mt-5 w-full'
            >
              {isLoading ? 'Creating...' : 'Create Budget'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateBudget