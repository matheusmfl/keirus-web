'use client'
import { makeLogout } from '@/app/api-fetch/makeLogout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { decryptToken } from '@/utils/decryptToken'

export function LogoutComponent() {
  function handleMakeLogout() {
    makeLogout()
  }

  const userName = decryptToken()
  return (
    <div
      className="h-12 py-1 px-1 flex gap-2 rounded-full bg-[#0A1F5B] w-full items-center cursor-pointer"
      onClick={handleMakeLogout}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>{' '}
      <span>{userName}</span>
    </div>
  )
}
