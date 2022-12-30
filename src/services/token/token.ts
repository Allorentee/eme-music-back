import jwt from 'jsonwebtoken'
import { TokenPayload } from "./tokenUtils"

export interface TokenClass {
    getSecret: (secret: string) => string
    createToken: (payload: TokenPayload) => string
    readToken: (token: string) =>  jwt.JwtPayload
}
