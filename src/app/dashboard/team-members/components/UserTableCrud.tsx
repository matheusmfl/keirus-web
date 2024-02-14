/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import toast, { Toaster } from 'react-hot-toast'

import dayjs from 'dayjs'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DialogClose } from '@radix-ui/react-dialog'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { ButtonLoading } from './ButtonLoading'
import { z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/form'
import { updateUser } from '@/app/api-fetch/updateUser'
import { DeleteModal } from './DeleteModal'

export interface Users {
  props: {
    id: string
    name: string
    email: string
    created_at: string
    last_access: string
  }
}

interface Props {
  UserList: Users[]
}

const UpdateMemberSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
})

type UserUpdateData = z.infer<typeof UpdateMemberSchema>

interface FormData {
  name?: string
  email?: string
}

export function UserTableCrud({ UserList }: Props) {
  const [selectedUser, setSelectedUser] = useState<Users | null>(null)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)

  const formContainerRef = useRef(null)
  const userLoginForm = useForm<UserUpdateData>({
    resolver: zodResolver(UpdateMemberSchema),
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = userLoginForm


  const handleOpenUpdateModal = (id: string) => {
    const handleSelectUser = UserList.find((user) => user.props.id === id)
    setOpenUpdateModal(true)
    setSelectedUser(handleSelectUser || null)
  }

  const handleUpdateUserProfile: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)
    setOpenUpdateModal(false)
    const userId = selectedUser?.props.id as string

    try {
      await updateUser({ userId, ...data })
      toast('✅ Success!')
    } catch (error) {
      toast.error('Updated Error')
    } finally {
      setIsLoading(false)
      setSelectedUser(null)
    }
  }

  return (
    <>
      <Table className="bg-white rounded-md px-5">
        <TableCaption>Keirus</TableCaption>
        <TableHeader>
          <TableRow className="border-none font-semibold text-lg text-[#A3A5A8]">
            <TableHead className="w-[100px] border-none">Name</TableHead>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead className="w-[100px]">Created At</TableHead>
            <TableHead className="w-[100px]">Last Access</TableHead>
            <TableHead className="w-[100px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {UserList.map((specification) => (
            <TableRow
              key={specification.props.id + specification.props.name}
              className="text-lg font-medium"
            >
              <TableCell className="space-y-3 flex gap-4 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>{' '}
                {specification.props.name}
              </TableCell>
              <TableCell className=" space-y-3">
                {specification.props.email}
              </TableCell>
              <TableCell className=" space-y-3">
                {dayjs(specification.props.created_at).format('MM/DD/YYYY')}
              </TableCell>
              <TableCell className=" space-y-3">
                {dayjs(specification.props.last_access).format('MM/DD/YYYY')}
              </TableCell>
              <TableCell className=" space-y-3">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`flex group bg-[#F5F4F7] data-[state=open]:text-white data-[state=open]:bg-black text-black  px-2 py-1 rounded-md font-normal items-center gap-1`}
                  >
                    Options <ChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black text-white">
                    <DropdownMenuItem
                      onClick={() =>
                        handleOpenUpdateModal(specification.props.id)
                      }
                      textValue="edit"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem textValue="resetPassword">
                      Reset password
                    </DropdownMenuItem>
                    <DeleteModal userId={specification.props.id}>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DeleteModal>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>


      <Dialog open={openUpdateModal}>
        <DialogContent className="w-[473px] py-[52px] px-[46px]">
          <DialogHeader className="flex flex-col gap-[21px]">
            <DialogTitle className="font-medium text-[20px] text-black">
              Update profile
            </DialogTitle>
            <DialogDescription className="font-normal text-[18px] text-[#838383]">
              Change the profile data
            </DialogDescription>

            <FormProvider {...userLoginForm}>
              <form
                onSubmit={handleSubmit(handleUpdateUserProfile)}
                className="flex flex-col gap-6"
              >
                <Form.Field ref={formContainerRef}>
                  <Form.LabelForm htmlFor="firstName">Name</Form.LabelForm>
                  <Form.InputForm className="h-[56px]" {...register('name')} />
                </Form.Field>

                <Form.Field>
                  <Form.LabelForm
                    className="text-lg text-black font-medium "
                    htmlFor="lastName"
                  >
                    Email
                  </Form.LabelForm>
                  <Form.InputForm {...register('email')} className="h-[56px]" />
                </Form.Field>
                {isLoading ? (
                  <ButtonLoading />
                ) : (
                  <Button
                    type="submit"
                    className="py-[22px] text-[16px] bg-black "
                  >
                    Confirm changes
                  </Button>
                )}
              </form>
            </FormProvider>

            <DialogClose asChild>
              <Button
                className="py-[22px] text-[16px] text-[#424242] bg-[#EEEEEE] "
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
