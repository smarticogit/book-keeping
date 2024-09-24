import { Output } from '@/infra/services/types'
import { StartExpenseAnalysisCommandOutput } from '@aws-sdk/client-textract'

export interface OCRService {
  analyze(statementKey: string): Promise<StartExpenseAnalysisCommandOutput>

  getResults(jobId: string): Promise<void>

  dataFormat(filePath: string): Output
}
