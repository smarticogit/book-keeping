import { StorageService } from '@/domain/services/storage-service'
import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Buffer } from 'buffer'
import { randomUUID } from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const CONTENT_ENCODING = 'base64'
const BUCKET = process.env.S3_BUCKET as string
const BASE64_REGEX = /^data:application\/pdf;base64,/
const newS3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export class S3FileUploader implements StorageService {
  private bucket: string
  private s3: S3

  constructor() {
    this.bucket = BUCKET
    this.s3 = newS3
  }

  async upload(file: Buffer | string): Promise<string | null> {
    let body: Buffer

    if (typeof file === 'string') {
      if (!BASE64_REGEX.test(file)) {
        throw new Error('Invalid base64 PDF data')
      }
      body = Buffer.from(file.replace(BASE64_REGEX, ''), CONTENT_ENCODING)
    } else {
      body = file
    }

    const generatedKey = `${randomUUID()}.pdf`

    try {
      const parallelUploads3 = new Upload({
        client: this.s3,
        params: {
          Bucket: this.bucket,
          Key: generatedKey,
          Body: body,
          ContentType: 'application/pdf',
          ContentEncoding: CONTENT_ENCODING,
        },
      })

      parallelUploads3.on('httpUploadProgress', console.log)

      const { Key } = await parallelUploads3.done()
      if (!Key) return null

      return Key
    } catch (e) {
      console.error('Upload failed:', e)
      return null
    }
  }
}
