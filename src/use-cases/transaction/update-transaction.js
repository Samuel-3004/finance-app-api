import { UserNotFoundError } from '../../errors/user'

export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository, getUserByIdRepository) {
        this.updateTransactionRepository = updateTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(updateTransactionParams) {
        const userId = updateTransactionParams.user_id

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transaction = await this.updateTransactionRepository.execute(
            updateTransactionParams,
        )

        return transaction
    }
}
