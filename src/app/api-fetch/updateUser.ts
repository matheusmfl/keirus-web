import { parseCookies } from 'nookies'

interface IUserUpdateData {
  name?: string
  email?: string
  userId: string
}

export async function updateUser({ name, email, userId }: IUserUpdateData) {
  const data = {
    name,
    email,
  }

  const cookies = parseCookies()
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies.Auth}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Unauthenticated')
  }

  const responseData = await response.json()
  return responseData
}
