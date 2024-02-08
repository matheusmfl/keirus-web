"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRef } from "react";
import { Form } from "@/components/form";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/app/api-fetch/registerUser";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "./ButtonLoadin";



const RegisterMemberSchema = z.object({
  firstName: z.string().min(1, { message: "first name is required" }),
  lastName: z.string().min(1, { message: "last name is required" }),
  email: z.string().min(1, {message: "Email required" }),
});

type UserLoginData = z.infer<typeof RegisterMemberSchema>;

interface FormData {
  firstName: string;
  lastName: string;
  email: string
}

export function RegisterForm() {
  const router = useRouter()
  const formContainerRef = useRef(null);
  const userLoginForm = useForm<UserLoginData>({
    resolver: zodResolver(RegisterMemberSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    
  } = userLoginForm;

  const onSubmit: SubmitHandler<FormData> = async (data) => {

  
      try {
        await registerUser({...data});
        toast('Success! Team Member created!');
      } catch (error) {
        toast.error('Error deleting User')
      }
      finally {
        router.push('/dashboard/team-members')
      }

   
}

  return (
    <div className=" w-[720px] rounded-md shadow-md bg-white pt-[58px] pb-[40px] px-[70px] flex flex-col">
          <Toaster
  position="top-right"
  reverseOrder={true}
/>
      <FormProvider {...userLoginForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Form.Field ref={formContainerRef}>
            <Form.LabelForm htmlFor="firstName">First name</Form.LabelForm>
            <Form.InputForm className="h-[56px]" {...register("firstName")} />
          </Form.Field>

          <Form.Field>
            <Form.LabelForm
              className="text-lg text-black font-medium "
              htmlFor="lastName"
            >
              Last name
            </Form.LabelForm>
            <Form.InputForm {...register("lastName")} className="h-[56px]" />
          </Form.Field>

          <Form.Field>
            <Form.LabelForm
              className="text-lg text-black font-medium "
              htmlFor="email"
            >
             Email
            </Form.LabelForm>
            <Form.InputForm {...register("email")} className="h-[56px]" />
          </Form.Field>

          {isSubmitting ? <ButtonLoading /> : <Button type="submit" variant={"login"} className="h-[63px]" disabled={isSubmitting}>
          Create and send invite{" "}
          </Button> }
          

        </form>
      </FormProvider>
    </div>
  );
}
