import { ExpenseDocument } from '@aws-sdk/client-textract'

export interface OCRService {
  analyze(): Promise<string>

  getResults(
    jobId: string,
  ): Promise<ExpenseDocument[] | null | undefined | null>

  run(): Promise<void>
}
