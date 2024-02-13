'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './form'
import { Button } from './ui/button'
import { useRef } from 'react'
import nookies from 'nookies'
import { useRouter } from 'next/navigation'
import { ButtonLoading } from '@/app/dashboard/team-members/components/ButtonLoading'

const userLoginSchema = z.object({
  email: z.string().min(1, { message: 'Username required' }),
  password: z.string().min(1, { message: 'Password required' }),
})

type UserLoginData = z.infer<typeof userLoginSchema>

interface FormData {
  email: string
  password: string
}

export function FormContainer() {
  const router = useRouter()
  const formContainerRef = useRef(null)
  const userLoginForm = useForm<UserLoginData>({
    resolver: zodResolver(userLoginSchema),
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = userLoginForm

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(JSON.stringify(data))

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Login falhou')
      }

      const responseData = await response.json()

      const authToken = responseData.access_token

      nookies.set(null, 'Auth', authToken, {
        maxAge: 60 * 60 * 24 * 2,
        path: '/',
      })
    } catch (error) {
      console.log(error)
    } finally {
      router.push('/dashboard/team-members')
    }
  }

  return (
    <div className="w-full flex flex-col">
      <FormProvider {...userLoginForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Form.Field ref={formContainerRef}>
            <Form.LabelForm htmlFor="email">Username</Form.LabelForm>
            <Form.InputForm {...register('email')} />
          </Form.Field>

          <Form.Field>
            <Form.LabelForm
              className="text-lg text-black font-medium"
              htmlFor="password"
            >
              Password
            </Form.LabelForm>
            <Form.InputForm {...register('password')} />
          </Form.Field>

          {isSubmitting ? (
            <ButtonLoading />
          ) : (
            <Button
              type="submit"
              variant={'login'}
              className="h-[63px]"
              disabled={isSubmitting}
            >
              Login to Keirus admin{' '}
            </Button>
          )}

          <div className="w-full flex justify-center">
            <span className="text-base text-[#1903D1] font-medium underline">
              <a href="">Forgot password</a>
            </span>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
