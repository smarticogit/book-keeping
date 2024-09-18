import { OCRService } from '@/domain/services/ocr-service'
import {
  FeatureType,
  GetExpenseAnalysisCommand,
  StartExpenseAnalysisCommand,
  TextractClient,
} from '@aws-sdk/client-textract'
import fs from 'fs'
import { env } from '../../env'

const textractClient = new TextractClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

const docName = '0bf58e74-3778-4ab3-9287-c8f6fe1e6e4f.pdf'
const outputFileName = 'textract-results.json'

const params = {
  DocumentLocation: {
    S3Object: {
      Bucket: env.S3_BUCKET_OCR,
      Name: docName,
    },
  },
  outputFileName,
  FeatureTypes: [FeatureType.TABLES, FeatureType.FORMS],
}

export class OCRTextract implements OCRService {
  async analyze(): Promise<string> {
    try {
      const command = new StartExpenseAnalysisCommand(params)
      const response = await textractClient.send(command)

      if (!response.JobId)
        throw new Error('Erro ao iniciar a análise de despesas')

      return response.JobId
    } catch (error) {
      throw new Error('Erro ao iniciar a análise do documento')
    }
  }

  async getResults(jobId: string) {
    let jobStatus = ''
    let result = null

    console.log('Aguardando a conclusão da análise de despesas...')

    while (jobStatus !== 'SUCCEEDED') {
      const command = new GetExpenseAnalysisCommand({
        JobId: jobId,
      })

      try {
        const response = await textractClient.send(command)
        jobStatus = response.JobStatus!

        if (jobStatus === 'SUCCEEDED') {
          result = response.ExpenseDocuments
          fs.writeFileSync(outputFileName, JSON.stringify(result, null, 2))
        } else if (jobStatus === 'FAILED') {
          throw new Error('Análise de despesas falhou')
        } else {
          console.log(`Status atual: ${jobStatus}, aguardando...`)
        }

        await new Promise((resolve) => setTimeout(resolve, 5000))
      } catch (error) {
        console.error('Erro ao obter resultados:', error)
        throw new Error('Erro ao processar os resultados do Textract')
      }
    }

    return result
  }

  async run() {
    try {
      const jobId = await this.analyze()
      await this.getResults(jobId)
      console.log('Resultados obtidos com sucesso!')
    } catch (error) {
      console.error('Erro ao executar a análise:', error)
    }
  }
}
