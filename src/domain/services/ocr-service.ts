import { StartDocumentAnalysisCommandOutput } from '@aws-sdk/client-textract'

export interface OCRService {
  analyze(docName: string): Promise<StartDocumentAnalysisCommandOutput | null>
}
