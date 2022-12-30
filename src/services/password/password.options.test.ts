import { Password } from "./password.options"
import bc from 'bcryptjs'


describe('Given password Functions...', () => { 
    bc.hash = jest.fn().mockResolvedValue('$2a$10$d4/dNm8dsx.7mXPoOkRsMub38qtxfZXAP3LNsxFexf7KdH17aY4q.')
    const pass = new Password

    describe('then when we call passwdEncrypt..', () => {     
        test('this function must return...', async () => { 
            const result = await pass.encrypt('password')
            expect(result).toBe('$2a$10$d4/dNm8dsx.7mXPoOkRsMub38qtxfZXAP3LNsxFexf7KdH17aY4q.')
        })
    })
    describe('then when we call passwdValidate..', () => {     
        test('then the method passwordValidate should return a false if the values dont match', async () => {
            bc.compare = jest.fn().mockResolvedValue(false);
            bc.hash = jest.fn().mockResolvedValue('2');
            const result = await pass.validate('', '2');
            expect(result).toBe(false);
        });
    })
})
