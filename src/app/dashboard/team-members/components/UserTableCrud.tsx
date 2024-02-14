'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
import { ChevronDown } from 'lucide-react'

import { DeleteUserModal } from './DeleteUserModal'
import { UpdateUserModal } from './UpdateUserModal'
import { useState } from 'react'

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

export function UserTableCrud({ UserList }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Users | null>(null)

  const handleOpenDeleteModal = (id: string) => {
    const handleSelectUser = UserList.find((user) => user.props.id === id)
    setIsDeleteModalOpen(true)
    setSelectedUser(handleSelectUser || null)
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
                    <UpdateUserModal userId={specification.props.id}>
                      <DropdownMenuItem textValue="edit" className="w-full">
                        Edit
                      </DropdownMenuItem>
                    </UpdateUserModal>

                    <DropdownMenuItem textValue="resetPassword">
                      Reset password
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() =>
                        handleOpenDeleteModal(specification.props.id)
                      }
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
      <DeleteUserModal
        userId={selectedUser?.props.id as string}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </>
  )
}
