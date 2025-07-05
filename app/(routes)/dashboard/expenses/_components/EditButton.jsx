'use client'

import React from "react";

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

function EditButton() {

    const [emojiPicker, setEmojiPicker] = useState('😀')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const { user } = useUser();

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                        <Edit2 />
                        Edit Budget
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Button className="flex gap-2">
                <Edit2 />
                Edit Budget
            </Button>
        </div>
    );
}

export default EditButton;
