import { ClientRepository } from '@/domain/repositories/client-repository'
import { OCRService } from '@/domain/services/ocr-service'
import { Output } from '@/infra/services/types'

export class ProcessOCRUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private ocrService: OCRService,
  ) {}

  async run(statementKey: string): Promise<Output | null> {
    const response = await this.ocrService.analyzeExpense(statementKey)

    if (!response.JobId) {
      return null
    }

    // const data = this.ocrService.dataFormat('./output.json')

    // if (!data) {
    //   return null
    // }

    // console.log('data', data)

    return null
  }
}
