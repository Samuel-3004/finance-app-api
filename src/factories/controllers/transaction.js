import {
    CreateTransactionController,
    GetTransactionsByUserIdController,
} from '../../controllers/index.js'
import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresGetUserByIdRepository,
} from '../../repositories/postgres/index.js'

import { CreateTransactionUseCase } from '../../use-cases/index.js'
import { GetTransactionsByUserIdUseCase } from '../../use-cases/transaction/get-transactions-by-user-id.js'

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    )

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}

export const makeGetTransactionsByUserIdController = () => {
    const getTransactionsByUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        getTransactionsByUserIdRepository,
        getUserByIdRepository,
    )

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase)

    return getTransactionsByUserIdController
}
