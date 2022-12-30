import { ErrorMiddlewares, ErrorSongsController, ErrorUserController } from "./error.management"
import { HTTPError } from "./interfaces/error"

describe('Given ErrorUserController... ', () => { 
    describe('When we called the funcions in the class ERRORUSERCONTROLLER...', () => { 
        const errors = new ErrorUserController()
        test('then the LOGINCONTROL function must return the error message', () => { 
            const mockError = new HTTPError(1000, 'Incorrect Password','Incorrect mockPassword')
            const result = errors.loginControl(mockError)
            expect(result).toBeInstanceOf(HTTPError)
        })
        test('then the LOGINCONTROL function must return the error message', () => { 
            const mockError = new HTTPError(500, 'Incorrect Password','Contraseña Incorrecta')
            const result = errors.loginControl(mockError)
            expect(result).toBeInstanceOf(HTTPError)
        })         
        test('then the LOGINCONTROL function must return the error message', () => { 
            const mockError = new HTTPError(500, 'Incorrect Password','Usuario no encontrado')
            const result = errors.loginControl(mockError)
            expect(result).toBeInstanceOf(HTTPError)
        })
        test('then the ADDFAV function must return the error message', () => { 
            const mockError = new HTTPError(1000, 'Incorrect Password','Cancion ya se encuentra en favoritos')
            const result = errors.addFav(mockError)
            expect(result).toBeInstanceOf(HTTPError)
        })
        test('then the ADDFAV function must return the error message', () => { 
            const mockError = new HTTPError(1000, 'Incorrect Password','')
            const result = errors.addFav(mockError)
            expect(result).toBeInstanceOf(HTTPError)
        })
    })
    describe('When we called the funcions in the class ERRORSONGSCONTROLLER...', () => { 
        const errors = new ErrorSongsController()
        test('then the createControl function must return the error message', () => { 
            const mockError = new HTTPError(1000, 'Incorrect Password','Invalid payload')
            const result = errors.createControl(mockError)
            expect(result).toBeInstanceOf(HTTPError)
        })
        test('then the createControl function must return the error message', () => { 
            const mockError = new HTTPError(1000, 'Incorrect Password','Contraseña Incorrecta')
            const result = errors.createControl(mockError)
            expect(result).toBeInstanceOf(HTTPError)
        })         
        test('then the createControl function must return the error message', () => { 
            const mockError = new HTTPError(1000, 'Incorrect Password','Usuario no encontrado')
            const result = errors.control(mockError)
            expect(result).toBeInstanceOf(HTTPError)
        })
    })
    describe('When we called the funcions in the class ERRORMIDDLEWARES...', () => { 
        const errors = new ErrorMiddlewares()
        test('then the middleware function must return the error message', () => { 
            const mockError = new HTTPError(1000, 'Incorrect Password','Unauthorized')
            const result = errors.middleWare(mockError)
            expect(result).toBeInstanceOf(HTTPError)
        })
    })
})
