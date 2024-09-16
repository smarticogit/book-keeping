import { StorageService } from '@/domain/services/storage-service'
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Buffer } from 'buffer'
import dotenv from 'dotenv'
import { s3Client } from './s3-config'

dotenv.config()

const CONTENT_ENCODING = 'base64'
const BUCKET = process.env.S3_BUCKET as string
const BASE64_REGEX = /^data:application\/pdf;base64,/

export class S3StorageService implements StorageService {
  private bucket: string
  private s3: S3Client

  constructor() {
    this.bucket = BUCKET
    this.s3 = s3Client
  }

  async upload(file: string | string): Promise<string | null> {
    let body: Buffer

    if (typeof file === 'string') {
      if (!BASE64_REGEX.test(file)) {
        throw new Error('Invalid base64 PDF data')
      }
      body = Buffer.from(file.replace(BASE64_REGEX, ''), CONTENT_ENCODING)
    } else {
      body = file
    }

    const generatedKey = `doc-${Date.now}.pdf`

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

      parallelUploads3.on('httpUploadProgress', (progress) => {
        console.log('Upload progress:', progress)
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
