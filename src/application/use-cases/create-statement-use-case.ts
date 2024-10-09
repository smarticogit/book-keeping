import {
  StatementRequest,
  StatementResponse,
} from '@/domain/entities/types/statement.types'
import { StatementRepository } from '@/domain/repositories/statement-repository'
import { OCRService } from '@/domain/services/ocr-service'
import { StorageService } from '@/domain/services/storage-service'

export class CreateStatementUseCase {
  constructor(
    private s3Service: StorageService,
    private statementRepository: StatementRepository,
    private ocrService: OCRService,
  ) {}

  async run({ ...input }: StatementRequest): Promise<StatementResponse | null> {
    const uploadKey = await this.s3Service.upload(input.statementFile)

    if (!uploadKey) {
      return null
    }

    console.log('File sended to S3')

    const statementCreated = await this.statementRepository.create({
      ...input,
      statementKey: uploadKey,
    })

    console.log('Statement created...')

    if (!statementCreated) {
      return null
    }

    const resultAnalyzeExpense = await this.ocrService.analyzeExpense(
      statementCreated.statementKey,
    )

    console.log('Analyze expense...')

    if (!resultAnalyzeExpense) {
      throw new Error('Analyze expense failed')
    }

    const resultAnalyzeDocument = await this.ocrService.analyzeDocument(
      statementCreated.statementKey,
    )

    console.log('Analyze document...')

    if (!resultAnalyzeDocument) {
      throw new Error('Analyze document failed')
    }

    const activities = this.ocrService.dataFormatExpense(resultAnalyzeExpense)

    console.log('Expense formatted...')

    const result = this.ocrService.dataFormat(resultAnalyzeDocument)

    console.log('Document formatted...')

    const statementUpdated = await this.statementRepository.update({
      ...statementCreated,
      statementDate: result.statementDate,
      customerName: result.customerName,
      customerNumber: result.customerNumber,
      accountType: result.accountType,
      accountNumber: result.accountNumber,
      beginningBalance: result.beginningBalance,
      endingBalance: result.endingBalance,
      accountActivity: activities,
    })

    console.log('Statement updated....Finished')

    return statementUpdated
  }
}
