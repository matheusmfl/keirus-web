import { parseCookies } from "nookies";

export async function deleteUser(userId: string) {
  try {
    const cookies = parseCookies();
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.Auth}` 
      },
    });


  } catch (error) {
    console.log(error)
    throw error;
  }
}