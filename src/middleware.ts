import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
  const cookie = req.cookies.get('auth')
  if(cookie){
    console.log('cookie existe')
   
    return NextResponse.redirect(new URL('/dashboard', req.url))
    
  }
  console.log(cookie)
  return NextResponse.next()
}

export const config = {
  matcher: '/'
}