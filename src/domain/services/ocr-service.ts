import { StartDocumentAnalysisCommandOutput } from '@aws-sdk/client-textract'

export interface OCRService {
  analyze(statementKey: string): Promise<StartDocumentAnalysisCommandOutput>

  getResults(jobId: string): Promise<unknown>
}
