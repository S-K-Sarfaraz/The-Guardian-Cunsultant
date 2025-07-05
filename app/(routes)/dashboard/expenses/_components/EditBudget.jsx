'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit2 } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'

function EditBudget({ budgetInfo, refreshData }) {
  // Initialize state with default values. If no emoji is provided, default to '😀'
  const [emojiPicker, setEmojiPicker] = useState(budgetInfo?.icon || '😀')
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const [name, setName] = useState(budgetInfo?.name || '')
  const [amount, setAmount] = useState(budgetInfo?.amount || '')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Get user info if needed (not used in this snippet)
  const { user } = useUser()

  // When the dialog opens (or budgetInfo changes), initialize the form fields.
  useEffect(() => {
    if (isOpen && budgetInfo) {
      setName(budgetInfo.name)
      setAmount(budgetInfo.amount)
      setEmojiPicker(budgetInfo.icon || '😀')
    }
  }, [isOpen, budgetInfo])

  // Function to update the budget entry
  const onUpdateBudget = async () => {
    try {
      setIsLoading(true)
      // Update the budget using your ORM (Drizzle ORM in this example)
      const result = await db
        .update(Budgets)
        .set({
          name: name,
          amount: Number(amount),
          icon: emojiPicker,
        })
        .where(eq(Budgets.id, budgetInfo.id))
        .returning()

      // Check that the result is nonempty.
      if (result && result.length > 0) {
        toast.success('Budget updated successfully.')
        refreshData()
        return true
      } else {
        toast.error('Failed to update budget.')
        return false
      }
    } catch (error) {
      toast.error('Failed to update budget.')
      console.error('Update error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          // When closing, clear the form state if needed.
          if (!open) {
            setName('')
            setAmount('')
            setEmojiPicker('😀')
          }
          setIsOpen(open)
        }}
      >
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <Edit2 />
            Edit Budget
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription asChild>
              <div className="text-sm text-muted-foreground">
                <div className="mt-5 relative">
                  <Button
                    variant="outline"
                    className="text-2xl"
                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  >
                    {emojiPicker}
                  </Button>
                  {openEmojiPicker && (
                    <div className="absolute z-10 mt-2">
                      <EmojiPicker
                        open={openEmojiPicker}
                        onEmojiClick={(emojiData, event) => {
                          setEmojiPicker(emojiData.emoji)
                          setOpenEmojiPicker(false)
                        }}
                      />
                    </div>
                  )}
                  <div className="mt-4">
                    <label className="font-medium text-black my-1 block">
                      Budget Name *
                    </label>
                    <Input
                      placeholder="e.g. Home Budget"
                      // value={name}
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="font-medium text-black my-1 block">
                      Budget Amount *
                    </label>
                    <Input
                      type="number"
                      step="1"
                      min="1"
                      placeholder="e.g. ₹5000"
                      // value={amount}
                      defaultValue={amount}
                      onKeyDown={(e) => {
                        // Block minus key input
                        if (e.key === '-' || e.key === 'Subtract') {
                          e.preventDefault()
                        }
                      }}
                      onChange={(e) => {
                        let value = e.target.value.replace(/-/g, '')
                        // Remove leading zeros if necessary.
                        if (value.length > 1 && value.startsWith('0')) {
                          value = value.replace(/^0+/, '')
                        }
                        setAmount(value)
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
                const success = await onUpdateBudget()
                if (success) setIsOpen(false)
              }}
              className="mt-5 w-full"
            >
              {isLoading ? 'Updating...' : 'Update Budget'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget
 