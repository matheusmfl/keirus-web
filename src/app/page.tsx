// 'use client'
import logo from "@/assets/logo.svg";
import  {FormContainer}  from "@/components/FormContainer";
import { env } from "@/env";
import Image from "next/image";



export default function Home() {

  console.log(env.SERVER_API_URL)
  return (
    <main className="bg-login min-h-screen min-w-screen  flex items-center justify-center ">

      <div className="flex flex-col gap-14">

        <div className="w-full flex items-center justify-center">
          <Image src={logo} alt="Keirus logo " />
        </div>

        <div className="rounded-[10px] w-[664px]  bg-white px-[72px]  pt-[81px] pb-[78px]">
          <FormContainer />
        </div>

      </div>

    </main>
  );
}
