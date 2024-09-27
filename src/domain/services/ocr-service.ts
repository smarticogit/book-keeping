import { ExtractedData } from '@/infra/services/types'
import {
  GetExpenseAnalysisCommandOutput,
  StartExpenseAnalysisCommandOutput,
} from '@aws-sdk/client-textract'

export interface OCRService {
  analyze(statementKey: string): Promise<StartExpenseAnalysisCommandOutput>
  getResults(jobId: string): Promise<GetExpenseAnalysisCommandOutput>
  dataFormat(
    parsedContent: GetExpenseAnalysisCommandOutput,
  ): ExtractedData | null
}
