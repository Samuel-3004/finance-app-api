import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFound,
    serverError,
    success,
} from './helpers/index.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isValidator = checkIfIdIsValid(httpRequest.params.userId)

            if (!isValidator) {
                return invalidIdResponse()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return notFound({ message: 'User not found.' })
            }

            return success(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
