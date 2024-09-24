import { StorageService } from '@/domain/services/storage-service'
import { env } from '@/env'
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Buffer } from 'buffer'
import { s3Client } from './s3-config'

const CONTENT_ENCODING = 'base64'

export class S3StorageService implements StorageService {
  private bucket: string
  private s3: S3Client

  constructor() {
    this.bucket = env.S3_BUCKET_OCR
    this.s3 = s3Client
  }

  async upload(file: Buffer): Promise<string | null> {
    const generatedKey = `${Date.now()}.pdf`

    try {
      const parallelUploads3 = new Upload({
        client: this.s3,
        params: {
          Bucket: this.bucket,
          Key: generatedKey,
          Body: file,
          ContentType: 'application/pdf',
          ContentEncoding: CONTENT_ENCODING,
        },
      })

      const { Key } = await parallelUploads3.done()
      if (!Key) return null

      return Key
    } catch (e) {
      console.error('Upload failed:', e)
      return null
    }
  }
}
