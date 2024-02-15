import Image from 'next/image'
import logo from '@/assets/logo.svg'
import { NavigationContainer } from './NavigationContainer'
import { LogoutComponent } from './Logout'

const mockOptions = [
  { label: 'Courses', path: '/courses' },
  { label: 'Companies', path: '/companies' },
  { label: 'Media gallery', path: '/media-gallery' },
  { label: 'Resources', path: '/resources' },
  { label: 'Team members', path: '/team-members' },
]

export function AsideNavMenu() {
  function setIsActive(path: string) {
    return path === '/team-members'
  }

  return (
    <div className="w-[218px] min-h-screen fixed left-0 top-0 bg-[#061235] pt-[52px] pb-[18px] flex flex-col items-center justify-between">
      <div className="flex flex-col gap-6">
        <div className="px-10">
          <Image src={logo} alt="Keirus logo" />
        </div>

        <NavigationContainer options={mockOptions} isActive={setIsActive} />
      </div>
      <div className="h-full flex items-end justify-end">
        <LogoutComponent />
      </div>
    </div>
  )
}
