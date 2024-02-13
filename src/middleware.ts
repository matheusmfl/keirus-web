import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const cookie = cookies().get('Auth')?.value
  const pathName = req.nextUrl.pathname
  const splittedPath = pathName.substring(1).split('/')
  const isDashboard = splittedPath[1] === 'team-members'
  if (cookie && pathName === '/') {
    return NextResponse.redirect(new URL('/dashboard/team-members', req.url))
  }

  if (!cookie && isDashboard) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/team-members'],
}
