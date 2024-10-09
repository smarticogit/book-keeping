import { StatementResponse } from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'
import { OCRService } from '@/domain/services/ocr-service'

export class ProcessStatementUseCase {
  constructor(
    private statementRepository: StatementRepository,
    private ocrService: OCRService,
  ) {}

  async run(statementId: string): Promise<StatementResponse | null> {
    const statement = await this.statementRepository.findById(statementId)

    if (!statement) {
      throw new Error('Statement not found')
    }

    // const resultAnalyzeExpense = await this.ocrService.analyzeExpense(
    //   statement.statementKey,
    // )

    // if (!resultAnalyzeExpense) {
    //   throw new Error('Analyze expense failed')
    // }

    // await this.ocrService.analyzeDocument(statement.statementKey)

    // const result = this.ocrService.dataFormat()
    // const activities = this.ocrService.dataFormatExpense()

    // const newData = {
    //   ...statement,
    //   bankName: result.bankName,
    //   statementDate: result.statementDate,
    //   customerName: result.customerName,
    //   customerNumber: result.customerNumber,
    //   accountType: result.accountType,
    //   accountNumber: result.accountNumber,
    //   beginningBalance: result.beginningBalance,
    //   endingBalance: result.endingBalance,
    //   accountActivity: activities,
    //   statementKey: statement.statementKey,
    // }

    // const statementUpdated = await this.statementRepository.update(newData)

    return null
  }
}
