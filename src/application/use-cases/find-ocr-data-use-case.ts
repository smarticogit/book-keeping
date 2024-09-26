import { ClientRepository } from '@/domain/repositories/client-repository'
import { OCRService } from '@/domain/services/ocr-service'
import { Output } from '@/infra/services/types'

export class FindOCRDataUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private ocrService: OCRService,
  ) {}

  async run(): Promise<Output | null> {
    const data = this.ocrService.dataFormat('./output.json')

    if (!data) {
      return null
    }

    console.log('data', data)

    return null
  }
}
