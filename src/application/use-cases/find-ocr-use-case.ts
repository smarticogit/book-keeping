import { ClientRepository } from '@/domain/repositories/client-repository'
import { OCRService } from '@/domain/services/ocr-service'

export class FindOCRUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private ocrService: OCRService,
  ) {}

  async run(statementKey: string): Promise<null> {
    const response = await this.ocrService.analyze(statementKey)

    if (!response.JobId) {
      return null
    }

    const result = await this.ocrService.getResults(response.JobId)

    console.log('result document', result)

    return null
  }
}
