import { api } from "@/lib/axios";

export interface signInBody {
  email: string
  password: string
}

export async function signIn({email, password}: signInBody){
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
  
}