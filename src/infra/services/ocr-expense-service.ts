import { OCRService } from '@/domain/services/ocr-service'
import {
  ExpenseDocument,
  ExpenseField,
  GetExpenseAnalysisCommand,
  LineItemFields,
  LineItemGroup,
  StartExpenseAnalysisCommand,
  StartExpenseAnalysisCommandOutput,
  TextractClient,
} from '@aws-sdk/client-textract'
import fs from 'fs'
import { env } from '../../env'
import { Output } from './types'

const textractClient = new TextractClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

const outputFileName = './output.json'

export class OCRTextractExpense implements OCRService {
  async analyze(
    statementKey: string,
  ): Promise<StartExpenseAnalysisCommandOutput> {
    if (!statementKey) {
      throw new Error('Statement key is required')
    }

    try {
      const command = new StartExpenseAnalysisCommand({
        DocumentLocation: {
          S3Object: {
            Bucket: env.S3_BUCKET_OCR,
            Name: `${statementKey}.pdf`,
          },
        },
      })

      const response = await textractClient.send(command)

      return response
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error')
    }
  }

  async getResults(jobId: string): Promise<void> {
    let jobStatus = ''
    let expenseDocuments: ExpenseDocument[] = []
    let nextToken: string | undefined

    console.log('Getting expense analysis results...')

    do {
      try {
        const response = await textractClient.send(
          new GetExpenseAnalysisCommand({
            JobId: jobId,
          }),
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
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000))
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
          }),
        )
        expenseDocuments = expenseDocuments.concat(
          response.ExpenseDocuments || [],
        )
        nextToken = response.NextToken
        fs.writeFileSync(outputFileName, JSON.stringify(response, null, 2))
      } catch (error) {
        console.error('Error getting expense analysis results:', error)
        throw new Error('Error processing expense analysis results')
      }
    } while (nextToken)

    console.log('Expense analysis results obtained successfully!')
  }

  dataFormat(): Output {
    console.log('starting format...')

    const fileContent = fs.readFileSync(outputFileName, 'utf-8')

    // Verifique se o conteúdo JSON tem a estrutura correta
    const parsedContent = JSON.parse(fileContent)

    const expenseDocuments: ExpenseDocument[] =
      parsedContent.ExpenseDocuments || []

    if (!Array.isArray(expenseDocuments)) {
      throw new Error('Expected ExpenseDocuments to be an array')
    }

    const extractedData = expenseDocuments.map((doc: ExpenseDocument) => {
      const summaryFields: ExpenseField[] = doc.SummaryFields || []
      const lineItemGroups = doc.LineItemGroups || []
      const summaryData: { [key: string]: string } = {}

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
                break
            }

            expenseRow += `${value} `
          })

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
}
