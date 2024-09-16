import { OCRService } from '@/domain/services/ocr-service'
import {
  FeatureType,
  StartDocumentAnalysisCommand,
  StartDocumentAnalysisCommandOutput,
  TextractClient,
} from '@aws-sdk/client-textract'

const textractClient = new TextractClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export class OcrTextract implements OCRService {
  async analyze(
    docName: string,
  ): Promise<StartDocumentAnalysisCommandOutput | null> {
    const bucketName = process.env.S3_BUCKET_NAME

    if (!bucketName) {
      throw new Error(
        'O nome do bucket S3 não está definido nas variáveis de ambiente',
      )
    }

    const params = {
      DocumentLocation: {
        S3Object: {
          Bucket: bucketName,
          Name: docName,
        },
      },
      FeatureTypes: [FeatureType.TABLES, FeatureType.FORMS],
    }

    try {
      const command = new StartDocumentAnalysisCommand(params)

      const response = await textractClient.send(command)

      console.log('Análise iniciada com sucesso:', response)
      return response
    } catch (error) {
      console.error('Erro ao iniciar a análise do documento:', error)
      throw new Error('Erro ao processar o documento')
    }
  }
}
