'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode, useState } from 'react'
import { ButtonLoading } from './ButtonLoading'
import { deleteUser } from '@/app/api-fetch/deleteUser'
import toast from 'react-hot-toast'

interface IDeleteModalProps {
  userId: string
  children: ReactNode
}

export function DeleteUserModal({ userId, children }: IDeleteModalProps) {
  const handleDeleteUser = async () => {
    setIsLoading(true)

    try {
      await deleteUser(userId)
      toast('Success!')
    } catch (error) {
      toast.error('Error deleting User')
    } finally {
      setIsLoading(false)
    }
  }
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[473px] py-[52px] px-[46px]">
        <DialogHeader className="flex flex-col gap-[21px]">
          <DialogTitle className="font-medium text-[26px] text-black">
            Are you sure?
          </DialogTitle>
          <DialogDescription className="font-normal text-[23px] text-[#838383]">
            Reversing this action is not possible.
          </DialogDescription>

          {isLoading ? (
            <ButtonLoading />
          ) : (
            <Button
              onClick={handleDeleteUser}
              className="py-[22px] text-[16px] bg-black "
            >
              Yes, Please delete member
            </Button>
          )}

          <DialogClose asChild>
            <Button className="py-[22px] text-[16px] text-[#424242] bg-[#EEEEEE]">
              Cancel
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
