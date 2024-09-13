import {
  BankAccountRequest,
  BankAccountResponse,
} from '@/domain/entities/types/bank-account.types'

export interface BankAccountRepository {
  create: (client: BankAccountRequest) => Promise<BankAccountResponse | null>
}
