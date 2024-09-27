import { StorageService } from '@/domain/services/storage-service'
import { env } from '@/env'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Buffer } from 'buffer'
import { Readable } from 'node:stream'
import { s3Client } from './s3-config'

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

  async get(key: string): Promise<Buffer | null> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })

      const response = await this.s3.send(command)
      const { Body } = response
      if (!Body) return null

      const data = await this.streamToBuffer(Body as Readable)
      return data
    } catch (e) {
      console.error('Get failed:', e)
      return null
    }
  }

  private streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []
      stream.on('data', (chunk: Buffer) => chunks.push(chunk))
      stream.on('error', reject)
      stream.on('end', () => resolve(Buffer.concat(chunks)))
    })
  }
}
