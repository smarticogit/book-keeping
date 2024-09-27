export interface StorageService {
  upload(file: Buffer): Promise<string | null>
  get(key: string): Promise<Buffer | null>
}
