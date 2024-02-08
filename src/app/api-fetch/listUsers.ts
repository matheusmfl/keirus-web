import { parseCookies } from "nookies";

export async function listUsers() {
  try {
    const cookies = parseCookies();
    const response = await fetch(`http://localhost:3000/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.Auth}` 
      },
    });

    if (!response.ok) {
      throw new Error('Unauthenticated');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
}