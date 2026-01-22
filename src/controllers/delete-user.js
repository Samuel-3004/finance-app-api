import { DeleteUserUseCase } from '../use-cases/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    success,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValidator = checkIfIdIsValid(userId)

            if (!idIsValidator) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deleteUserUseCase.execute(userId)

            return success(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
