"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./form";
import { Button } from "./ui/button";
import { useRef } from "react";
import { signIn } from "@/api-types/sign-in";
import nookies from 'nookies'
import { jwtDecode } from "jwt-decode";


const userLoginSchema = z.object({
  username: z.string().min(1, { message: "Username required" }),
  password: z.string().min(1, { message: "Password required" }),
});

type UserLoginData = z.infer<typeof userLoginSchema>;

interface FormData {
  username: string;
  password: string;
}

export function FormContainer() {
  const formContainerRef = useRef(null);
  const userLoginForm = useForm<UserLoginData>({
    resolver: zodResolver(userLoginSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = userLoginForm;

  const onSubmit: SubmitHandler<FormData> = (data) => {

    try {
      
      const response = signIn({email: data.username, password: data.password}).then(response => {
        const token = response.access_token;
        
        nookies.set(null,'Auth', token, {
          maxAge: 60 * 60 * 24 * 2,
          path: '/'
        })
      
        
        const decodedToken = jwtDecode(token)

        console.log(decodedToken);

  
      })
      
    } catch (error) {
      console.log(error)
    }
    

    
  };

  return (
    <div className="w-full flex flex-col">
      <FormProvider {...userLoginForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Form.Field ref={formContainerRef}>
            <Form.LabelForm htmlFor="username">Username</Form.LabelForm>
            <Form.InputForm {...register("username")} />
          </Form.Field>

          <Form.Field>
            <Form.LabelForm
              className="text-lg text-black font-medium"
              htmlFor="password"
            >
              Password
            </Form.LabelForm>
            <Form.InputForm {...register("password")} />
          </Form.Field>

          <Button type="submit" variant={"login"} className="h-[80px]" disabled={isSubmitting}>
            Login to Keirus admin{" "}
          </Button>

          <div className="w-full flex justify-center">
            <span className="text-base text-[#1903D1] font-medium underline">
              <a href="">Forgot password</a>
            </span>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
