import { TokenOptions } from "./tokenUtils"
import jwt from 'jsonwebtoken'

describe('Given TokenOptions class', () => { 

    const token = new TokenOptions()
    const mockPayload = {
        id: '',
        name: '',
        role: '',
    }

    describe('Then when we use getSecret...', () => { 
        test('this must return the secret', () => { 
            expect(()=>{
                token.getSecret('')
            }).toThrowError()
        })
    })
    describe('Then when we use createToken...', () => { 
        test('this must return a payload', () => { 
            jwt.sign = jest.fn().mockReturnValue('token')
            const result = token.createToken(mockPayload)
            expect(result).toBe('token')
        })
    })
    describe('Then when we use readToken..', () => { 
        test('This must return a payload.', ()=>{
            jwt.verify = jest.fn().mockReturnValue('payload')
            const result = token.readToken('')
            expect(result).toBe('payload')
        })
    })
})
