## Book Keeping Project Doc

### Entitys

```typescript
class User = {
    id: string
    name: string
    email: string
    password: string
    active: boolean
    createdAt: Date
}

class Client {
    id: string
    name: string
    email: string
    cpf?: string
    cnpj?: string
    address: Address
    bankAccounts: BankAccount[]
    createdAt: Date
    updatedAt: Date
}

class OCROutput {
    id: string
    data: {}
}

class Statement {
    id: string
    banckAccountId: string
    statementDate: Date
    fileUrl: string
    signedFileUrl: string
    accountActivity?: AccountActivity[]
    createdAt: Date
    updatedAt: Date
}

class AccountActivity {
    id: string
    statementId: string
    postDate: Date
    description: string
    debit: number
    credit: number
    balance: int
    beginningBalance: number
    endingBalance: number
    category: Category[]
}

class Category {
    id: string
    name: string
    subCategory: SubCategory1[]
}

class Report {
    id: string
    clientId: string
    bankAccountId: string
    createdAt: Date

}

type SubCategory1 {
    id: string
    name: string
    subCategory: subCategory2[]
}

type SubCategory2 {
    id: string
    name: string
}

type Address {
    street: string
    number: string
    complement?: string 
    city: string
    state: string
    postalCode: string
    country: string
}

class BankAccount {
    clientId: string
    bankName: string
    accountNumber: string
    branchNumber: string
    accountType: 'checking' | 'savings'
    statements: Statement[]
}

type TransactionType = 'income' | 'expense'
type ExpenseCategory = 'gas_station' | 'restaurant' | 'supermarket' | 'others'


```
