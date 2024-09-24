import { Output } from '@/infra/services/types'
import {
  ExpenseDocument,
  StartDocumentAnalysisCommandOutput,
} from '@aws-sdk/client-textract'

export interface OCRService {
  analyze(statementKey: string): Promise<StartDocumentAnalysisCommandOutput>

  getResults(jobId: string): Promise<ExpenseDocument[] | null>

  dataFormat(filePath: string): Output
}
