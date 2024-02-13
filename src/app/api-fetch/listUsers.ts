import { parseCookies } from 'nookies'

export async function listUsers() {
  const cookies = parseCookies()
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies.Auth}`,
    },
  })

  const responseData = await response.json()
  return responseData
}
