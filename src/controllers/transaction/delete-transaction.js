import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    success,
    transactionNotFoundResponse,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId

            const idIsValidator = checkIfIdIsValid(transactionId)

            if (!idIsValidator) {
                return invalidIdResponse()
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(transactionId)

            if (!deletedTransaction) {
                return transactionNotFoundResponse()
            }

            return success(deletedTransaction)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
