import { parseCookies } from 'nookies'
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface ITokenDecoded {
  sub: string
  username: string
  iat: number
  exp: number
}

export function decryptToken() {
  const cookies = parseCookies()
  const parsedCookie = Object.entries(cookies).find(([name]) => name === 'Auth')
  let token

  if (parsedCookie) {
    token = parsedCookie[1]
    const decodedToken = jwt.decode(token) as JwtPayload | string
    if (typeof decodedToken === 'string') {
      console.error('Erro ao decodificar o token. O token é uma string.')
    } else {
      return decodedToken?.username
    }
  }
}
