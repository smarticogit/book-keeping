export interface OCRService {
  analyze(): Promise<string>

  getResults(jobId: string): Promise<unknown>

  run(): Promise<void>
}
