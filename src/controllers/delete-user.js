import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    success,
    userNotFoundResponse,
} from './helpers/index.js'

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValidator = checkIfIdIsValid(userId)

            if (!idIsValidator) {
                return invalidIdResponse()
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId)

            console.log(deletedUser)

            if (!deletedUser) {
                return userNotFoundResponse()
            }

            return success(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
