import { OCRService } from '@/domain/services/ocr-service'
import {
  ExpenseDocument,
  ExpenseField,
  GetExpenseAnalysisCommand,
  GetExpenseAnalysisCommandOutput,
  LineItemFields,
  LineItemGroup,
  StartExpenseAnalysisCommand,
  StartExpenseAnalysisCommandOutput,
  TextractClient,
} from '@aws-sdk/client-textract'
import fs from 'fs'
import { env } from '../../env'
import { ExtractedData } from './types'

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
            Name: statementKey,
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

  async getResults(jobId: string): Promise<GetExpenseAnalysisCommandOutput> {
    let jobStatus = ''
    let expenseDocuments: ExpenseDocument[] = []
    let nextToken: string | undefined
    let results: GetExpenseAnalysisCommandOutput | null = null

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
          console.error(`Error message: ${response.StatusMessage}`)
          throw new Error('Expense analysis job failed.')
        } else {
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }
      } catch (error) {
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
        results = response
      } catch (error) {
        console.error('Error getting expense analysis results:', error)
        throw new Error('Error processing expense analysis results')
      }
    } while (nextToken)

    return results
  }

  dataFormat(
    parsedContent: GetExpenseAnalysisCommandOutput,
  ): ExtractedData | null {
    if (!parsedContent) {
      throw new Error('Parsed content is required')
    }

    console.log('starting format...')

    const expenseDocuments: ExpenseDocument[] =
      parsedContent.ExpenseDocuments || []

    if (!Array.isArray(expenseDocuments)) {
      throw new Error('Esperado que ExpenseDocuments seja um array')
    }

    let bankName = ''
    let customerName = ''
    let customerNumber = ''
    let phoneNumber = ''
    let accountType = ''
    let accountNumber = ''
    let beginningBalance = ''
    let endingBalance = ''
    let statementDate = ''

    const activities: {
      postDate?: string
      description?: string
      debits?: string
      credits?: string
      balance?: string
    }[] = []

    expenseDocuments.forEach((doc: ExpenseDocument) => {
      const summaryFields: ExpenseField[] = doc.SummaryFields || []
      const lineItemGroups = doc.LineItemGroups || []
      console.log('array -> ', doc)

      summaryFields.forEach((field: ExpenseField) => {
        const label = field.LabelDetection?.Text || ''
        const value = field.ValueDetection?.Text || ''

        switch (label.toUpperCase()) {
          case 'BANK NAME':
            bankName = value
            break
          case 'CUSTOMER NUMBER:':
            customerNumber = value
            break
          case 'PHONE NUMBER':
            phoneNumber = value
            break
          case 'ACCOUNT TYPE':
            accountType = value
            break
          case 'ACCOUNT NUMBER':
            accountNumber = value
            break
          case 'BEGINNING BALANCE':
            beginningBalance = value
            break
          case 'ENDING BALANCE':
            endingBalance = value
            break
          case 'STATEMENT ENDING':
            statementDate = value
            break
          default:
            if (label.includes('CUSTOMER')) {
              customerName = value
            }
            break
        }
      })

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
    })

    return {
      bankName,
      customerName,
      customerNumber,
      phoneNumber,
      accountType,
      accountNumber,
      beginningBalance,
      endingBalance,
      statementDate,
      activities,
    }
  }
}
