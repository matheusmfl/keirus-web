import Image from 'next/image'
import ico from '@/assets/burguer-icon.svg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Header({ membersLength }: { membersLength: number }) {
  return (
    <header className="w-full h-[150px] py-[30px] px-[40px] bg-white flex flex-col gap-[17px]">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-[10px]">
          <Image src={ico} alt="Icon" />

          <h1 className="font-bold text-[33px]">Team members</h1>
        </div>

        <Link href={'/dashboard/team-members/register'}>
          <Button
            className="border-black border text-black font-semibold"
            variant={'outline'}
          >
            + Add member
          </Button>
        </Link>
      </div>

      <span className="text-[#838383] text-[23px] font-normal">
        {membersLength || 'Awaiting number'} members
      </span>
    </header>
  )
}
