import jwt from 'jsonwebtoken'
import { SECRET } from "../../config.js";
import { TokenClass } from './token.js';

export type TokenPayload = {
    id: string
    name: string
    role: string
}
export class TokenOptions implements TokenClass {
    getSecret(secret = SECRET){
        if(typeof secret !== 'string' || secret === '') {
            throw new Error('Bad secret for token creator.')
        }
        return secret
    }
    createToken(payload: TokenPayload){
        return jwt.sign(payload, this.getSecret())
    }
    readToken(token: string){
        const payload = jwt.verify(token, this.getSecret())
        return payload as jwt.JwtPayload
    }
}
