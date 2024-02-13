interface NavigationProps {
  options: { label: string; path: string }[]
  isActive: (path: string) => boolean
}

export function NavigationContainer({ options, isActive }: NavigationProps) {
  return (
    <nav className="px-6 pl-[20px] font-montSerrat">
      <ul className="flex flex-col gap-[21px]">
        {options.map((option, index) => (
          <li key={index}>
            <a
              href={option.path}
              className={` text-base font-normal ${isActive(option.path) ? 'text-[#F2BE2B] font-bold' : 'text-white'}`}
            >
              <div className="flex items-center gap-[10px]">
                <div
                  className={`w-[15px] h-[15px]  rounded-full ${isActive(option.path) ? 'bg-[#F2BE2B]' : 'bg-white'}`}
                />
                <span>{option.label}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
