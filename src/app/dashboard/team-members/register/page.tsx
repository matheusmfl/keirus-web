import { RegisterForm } from './components/RegisterForm'

export default function Register() {
  return (
    <div className="min-h-screen bg-[#F6F6F9] flex flex-col gap-12">
      <header className="w-full h-[150px] py-[30px] px-[40px] bg-white flex items-center">
        <h1 className="font-bold text-[33px]">Add members</h1>
      </header>

      <section className="flex justify-center w-full">
        <RegisterForm />
      </section>
    </div>
  )
}
