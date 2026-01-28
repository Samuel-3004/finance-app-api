import {
    badRequest,
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    success,
} from '../helpers/index.js'
import {
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidTypeResponse,
} from '../helpers/transaction.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId
            const params = httpRequest.body

            const isValidator = checkIfIdIsValid(transactionId)

            if (!isValidator) {
                return invalidIdResponse()
            }

            const allowedFields = ['name', 'date', 'amount', 'type']

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some fields are not allowed to be updated.',
                })
            }

            if (params.amount) {
                if (params.amount <= 0) {
                    return badRequest({
                        message: 'The amount must be greater than zero.',
                    })
                }

                const amountIsValid = checkIfAmountIsValid(params.amount)

                if (!amountIsValid) {
                    return invalidAmountResponse()
                }
            }

            if (params.type) {
                const type = params.type.trim().toUpperCase()

                const typeIsValid = checkIfTypeIsValid(type)

                if (!typeIsValid) {
                    return invalidTypeResponse()
                }

                params.type = type
            }

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    params,
                )

            return success(updatedTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
