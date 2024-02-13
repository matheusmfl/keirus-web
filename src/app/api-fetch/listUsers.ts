'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function listUsers() {
  const token = cookies().get('Auth')?.value

  if (!token) {
    redirect('/')
  }
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const responseData = await response.json()
  return responseData
}
