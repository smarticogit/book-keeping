import {
  GetDocumentAnalysisCommandOutput,
  GetExpenseAnalysisCommandOutput,
} from '@aws-sdk/client-textract'
import {
  AccountActivityUpdate,
  StatementUpdate,
} from '../entities/types/statement.types'

export interface OCRService {
  analyzeDocument(
    statementKey: string,
  ): Promise<GetDocumentAnalysisCommandOutput | null>

  analyzeExpense(
    statementKey: string,
  ): Promise<GetExpenseAnalysisCommandOutput | null>

  dataFormat(input: GetDocumentAnalysisCommandOutput): StatementUpdate

  dataFormatExpense(
    input: GetExpenseAnalysisCommandOutput,
  ): AccountActivityUpdate[]
}
