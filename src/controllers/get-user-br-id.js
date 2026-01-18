import validator from 'validator'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, serverError, success } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isValidator = validator.isUUID(httpRequest.params.userId)

            if (!isValidator) {
                return badRequest({ message: 'The provided id is not valid.' })
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            return success(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
