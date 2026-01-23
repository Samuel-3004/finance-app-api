import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    success,
    userNotFoundResponse,
} from './helpers/index.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }

    async execute(httpRequest) {
        try {
            const isValidator = checkIfIdIsValid(httpRequest.params.userId)

            if (!isValidator) {
                return invalidIdResponse()
            }

            const user = await this.getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return userNotFoundResponse()
            }

            return success(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
