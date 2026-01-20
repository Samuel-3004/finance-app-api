import validator from 'validator'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { notFound, serverError, success } from './helpers/http.js'
import { invalidIdResponse } from './helpers/user.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isValidator = validator.isUUID(httpRequest.params.userId)

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
