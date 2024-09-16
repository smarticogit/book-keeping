export interface StorageService {
  upload(file: string): Promise<string | null>
}
