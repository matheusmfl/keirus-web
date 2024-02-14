'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useRef, ReactNode, ComponentProps } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/form'
import { updateUser } from '@/app/api-fetch/updateUser'
import toast from 'react-hot-toast'
import { ButtonLoading } from '../register/components/ButtonLoadin'
import { Button } from '@/components/ui/button'
import { z } from 'zod'

interface IUpdateUserModalProps extends ComponentProps<typeof Dialog> {
  userId: string
  children: ReactNode
}

export function UpdateUserModal({
  userId,
  children,
  ...props
}: IUpdateUserModalProps) {
  const UpdateMemberSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
  })

  type UserUpdateData = z.infer<typeof UpdateMemberSchema>

  interface FormData {
    name?: string
    email?: string
  }

  const userLoginForm = useForm<UserUpdateData>({
    resolver: zodResolver(UpdateMemberSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = userLoginForm

  const formContainerRef = useRef(null)

  const handleUpdateUserProfile: SubmitHandler<FormData> = async (data) => {
    try {
      await updateUser({ userId, ...data })
      toast('✅ Success!')
    } catch (error) {
      toast.error('Updated Error')
    }
  }
  return (
    <Dialog {...props}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className="w-[473px] py-[52px] px-[46px]"
        // onEscapeKeyDown={}
      >
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
              {isSubmitting ? (
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
            <Button className="py-[22px] text-[16px] text-[#424242] bg-[#EEEEEE]">
              Cancel
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
