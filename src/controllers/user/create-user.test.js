import { CreateUserController } from './create-user.js'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    it('should return 201 when creating a user successfully', async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Henrique',
                last_name: 'Poleot',
                email: 'henrique@poleot.com',
                password: '123456',
            },
        }

        // Act
        const result = await createUserController.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(201)
        expect(result.body).toEqual(httpRequest.body)
    })

    it('should return 400 if first_name is not provided', async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                last_name: 'Doe',
                email: 'john@doe.com',
                password: '123456',
            },
        }

        // Act
        const result = await createUserController.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if last_name is not provided', async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'John',
                email: 'john@doe.com',
                password: '123456',
            },
        }

        // Act
        const result = await createUserController.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if e-mail is not provided', async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'John',
                last_name: 'Doe',
                password: '123456',
            },
        }

        // Act
        const result = await createUserController.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if e-mail is not a valid', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.com',
                password: '123456',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'jonh@doe.com',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is less than 6 characters', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'jonh@doe.com',
                password: '123',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should call CreateUserUseCase with correct params', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Henrique',
                last_name: 'Poleot',
                email: 'henrique@poleot.com',
                password: '123456',
            },
        }

        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        await createUserController.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
    })
})
