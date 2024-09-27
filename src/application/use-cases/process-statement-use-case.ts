import { StatementRepository } from '@/domain/repositories/statement-repository'
import { OCRService } from '@/domain/services/ocr-service'
import { ExtractedData } from '@/infra/services/types'

export class ProcessStatementUseCase {
  constructor(
    private statementRepository: StatementRepository,
    private ocrService: OCRService,
  ) {}

  async run(statementId: string): Promise<ExtractedData | null> {
    const statement = await this.statementRepository.findById(statementId)

    if (!statement) {
      throw new Error('Statement not found')
    }

    const response = await this.ocrService.analyze(statement.statementKey)

    if (!response.JobId) {
      throw new Error('Análise falhou')
    }

    const analysisResponse = await this.ocrService.getResults(response.JobId)

    if (!analysisResponse) {
      throw new Error('Análise falhou ou não retornou resultados.')
    }

    const data = this.ocrService.dataFormat(analysisResponse)

    if (!data) {
      return null
    }
    return data
  }
}
