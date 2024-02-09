import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest){

  const cookie = cookies().get('Auth')?.value


  console.log(cookie)

  if(cookie){
    return NextResponse.redirect(new URL('/dashboard/team-members', req.url))
  }
    
  return NextResponse.next()

    
  }



export const config = {
  matcher: '/'
}