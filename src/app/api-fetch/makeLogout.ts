'use server'

import { cookies } from 'next/headers'

export async function makeLogout() {
  cookies().delete('Auth')
}
