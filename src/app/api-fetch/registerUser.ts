import { parseCookies } from "nookies";

interface IUserRegisterData {
  firstName: string
  lastName: string
  email: string
}

export async function registerUser({firstName, lastName, email}: IUserRegisterData) {

  const data = {
    name: firstName + ' ' + lastName,
    email,
    password: 'KeirusUser1@',
    role: 'USER'
  }
  try {
    const cookies = parseCookies();
    const response = await fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.Auth}` 
      },
      body: JSON.stringify(data)
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