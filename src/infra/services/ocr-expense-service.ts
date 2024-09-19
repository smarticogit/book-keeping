import { OCRService } from '@/domain/services/ocr-service'
import {
  ExpenseDocument,
  ExpenseField,
  GetExpenseAnalysisCommand,
  GetExpenseAnalysisCommandInput,
  LineItemFields,
  LineItemGroup,
  StartExpenseAnalysisCommand,
  StartExpenseAnalysisCommandInput,
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
const outputFileName = 'expense-results.json'

const params: StartExpenseAnalysisCommandInput = {
  DocumentLocation: {
    S3Object: {
      Bucket: env.S3_BUCKET_OCR,
      Name: docName,
    },
  },
}

export class OCRTextractExpense implements OCRService {
  async analyze(): Promise<string> {
    try {
      const command = new StartExpenseAnalysisCommand(params)
      const response = await textractClient.send(command)

      if (!response.JobId) {
        throw new Error('Error starting expense analysis')
      }

      return response.JobId
    } catch (error) {
      console.error('Error starting expense analysis:', error)
      throw new Error('Error starting expense analysis')
    }
  }

  async getResults(jobId: string) {
    let jobStatus = ''
    let expenseDocuments: ExpenseDocument[] = []
    let nextToken: string | undefined

    console.log('Getting expense analysis results...')

    do {
      try {
        const response = await textractClient.send(
          new GetExpenseAnalysisCommand({
            JobId: jobId,
          } as GetExpenseAnalysisCommandInput),
        )
        jobStatus = response.JobStatus!

        console.log(`Status: ${jobStatus}...`)

        if (jobStatus === 'SUCCEEDED') {
          break
        } else if (jobStatus === 'FAILED') {
          console.error('Expense analysis job failed.')
          if (response.StatusMessage) {
            console.error(`Error message: ${response.StatusMessage}`)
          }
          return
        } else {
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }
      } catch (error) {
        console.error('Error getting expense analysis results:', error)
        throw new Error('Error getting expense analysis results')
      }
    } while (jobStatus !== 'SUCCEEDED' && jobStatus !== 'FAILED')

    do {
      try {
        const response = await textractClient.send(
          new GetExpenseAnalysisCommand({
            JobId: jobId,
            NextToken: nextToken,
          } as GetExpenseAnalysisCommandInput),
        )

        expenseDocuments = expenseDocuments.concat(
          response.ExpenseDocuments || [],
        )
        nextToken = response.NextToken
      } catch (error) {
        console.error('Error getting expense analysis results:', error)
        throw new Error('Error processing expense analysis results')
      }
    } while (nextToken)

    const data = this.processExpenseDocuments(expenseDocuments)

    fs.writeFileSync(outputFileName, JSON.stringify(data, null, 2))
    console.log('Expense analysis results obtained successfully!')
    return data
  }

  processExpenseDocuments(expenseDocuments: ExpenseDocument[]) {
    const extractedData = expenseDocuments.map((doc: ExpenseDocument) => {
      const summaryFields: ExpenseField[] = doc.SummaryFields || []
      const lineItemGroups = doc.LineItemGroups || []
      const summaryData: { [key: string]: string } = {}

      // Processando os campos sumários
      summaryFields.forEach((field: ExpenseField) => {
        const label = field.LabelDetection?.Text || ''
        const value = field.ValueDetection?.Text || ''
        summaryData[label] = value
      })

      const activities: {
        postDate?: string
        description?: string
        debits?: string
        credits?: string
        balance?: string
      }[] = []

      // Processando os itens de linha
      lineItemGroups.forEach((group: LineItemGroup) => {
        group.LineItems?.forEach((lineItem: LineItemFields) => {
          let postDate = ''
          let description = ''
          let debits = ''
          let credits = ''
          let balance = ''
          let expenseRow = ''

          lineItem.LineItemExpenseFields?.forEach((field: ExpenseField) => {
            const type = field.Type?.Text || ''
            const value = field.ValueDetection?.Text || ''

            switch (type.toUpperCase()) {
              case 'DATE':
                postDate = value
                break
              case 'DESCRIPTION':
              case 'ITEM':
                description = value
                break
              case 'DEBIT':
              case 'DEBITS':
              case 'WITHDRAWAL':
                debits = value
                break
              case 'CREDIT':
              case 'CREDITS':
              case 'DEPOSIT':
                credits = value
                break
              case 'BALANCE':
              case 'PRICE':
                balance = value
                break
              default:
                // Outros campos, se necessário
                break
            }

            // Construindo o EXPENSE_ROW (opcional)
            expenseRow += `${value} `
          })

          // Se não houver postDate, tentar extrair do EXPENSE_ROW
          if (!postDate) {
            const dateMatch = expenseRow.match(/\d{2}\/\d{2}\/\d{4}/)
            if (dateMatch) {
              postDate = dateMatch[0]
            }
          }

          activities.push({
            postDate: postDate.trim(),
            description: description.trim(),
            debits: debits.trim(),
            credits: credits.trim(),
            balance: balance.trim(),
          })
        })
      })

      return {
        summaryData,
        activities,
      }
    })

    return extractedData
  }

  async run() {
    try {
      const jobId = await this.analyze()
      await this.getResults(jobId)
    } catch (error) {
      console.error('Error executing expense analysis:', error)
    }
  }
}
