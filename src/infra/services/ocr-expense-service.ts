import {
  AccountActivityUpdate,
  StatementUpdate,
} from '@/domain/entities/types/statement.types'
import { OCRService } from '@/domain/services/ocr-service'
import {
  Block,
  FeatureType,
  GetDocumentAnalysisCommand,
  GetDocumentAnalysisCommandOutput,
  GetExpenseAnalysisCommand,
  GetExpenseAnalysisCommandOutput,
  StartDocumentAnalysisCommand,
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

export class OCRTextractExpense implements OCRService {
  async analyzeDocument(
    statementKey: string,
  ): Promise<GetDocumentAnalysisCommandOutput | null> {
    if (!statementKey) {
      throw new Error('Statement key is required')
    }
    const input = {
      DocumentLocation: {
        S3Object: {
          Bucket: env.S3_BUCKET_OCR,
          Name: statementKey,
        },
      },
      FeatureTypes: [FeatureType.TABLES, FeatureType.FORMS],
    }

    const command = new StartDocumentAnalysisCommand(input)
    const response = await textractClient.send(command)

    if (!response.JobId) {
      throw new Error('Análise falhou')
    }
    let jobStatus = ''
    let analysisResult: GetDocumentAnalysisCommandOutput | null = null

    do {
      try {
        analysisResult = await textractClient.send(
          new GetDocumentAnalysisCommand({
            JobId: response.JobId!,
          }),
        )

        jobStatus = analysisResult.JobStatus!
        console.log('jobStatus Document... ->', jobStatus)

        if (jobStatus === 'SUCCEEDED') {
          break
        } else if (jobStatus === 'FAILED') {
          throw new Error('Expense analysis job failed.')
        } else {
          await new Promise((resolve) => setTimeout(resolve, 5000))
        }
      } catch (error) {
        console.log('Error getting expense analysis results:', error)
        throw new Error('Error getting expense analysis results')
      }
    } while (jobStatus !== 'SUCCEEDED' && jobStatus !== 'FAILED')

    fs.writeFileSync('./document.json', JSON.stringify(analysisResult, null, 2))

    return analysisResult

    // console.log('Generated document.json with success')
  }

  async analyzeExpense(
    statementKey: string,
  ): Promise<GetExpenseAnalysisCommandOutput> {
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
      let jobStatus = ''
      let analysisResult: GetExpenseAnalysisCommandOutput

      do {
        console.log('jobStatus Expense... ->', jobStatus)

        try {
          analysisResult = await textractClient.send(
            new GetExpenseAnalysisCommand({
              JobId: response.JobId!,
            }),
          )

          jobStatus = analysisResult.JobStatus!

          if (jobStatus === 'SUCCEEDED') {
            break
          } else if (jobStatus === 'FAILED') {
            throw new Error('Expense analysis job failed.')
          } else {
            await new Promise((resolve) => setTimeout(resolve, 5000))
          }
        } catch (error) {
          console.log('Error getting expense analysis results:', error)
          throw new Error('Error getting expense analysis results')
        }
      } while (jobStatus !== 'SUCCEEDED' && jobStatus !== 'FAILED')

      fs.writeFileSync(
        './expense.json',
        JSON.stringify(analysisResult, null, 2),
      )

      return analysisResult
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error')
    }
  }

  dataFormat(input: GetDocumentAnalysisCommandOutput): StatementUpdate {
    // const rawData = fs.readFileSync('./document.json', 'utf8')
    const data: GetDocumentAnalysisCommandOutput = input

    if (!data || !data.Blocks) {
      throw new Error('No data found in analysis result')
    }

    const blockMap: Record<string, Block> = {}
    data.Blocks.forEach((block) => {
      if (block.Id) {
        console.log(`Block Id: ${(blockMap[block.Id] = block)}`)

        blockMap[block.Id] = block
      }
    })

    const keyValuePairs: Record<string, string> = {}

    data.Blocks.forEach((block) => {
      if (
        block.BlockType === 'KEY_VALUE_SET' &&
        block.EntityTypes?.includes('KEY')
      ) {
        const keyText = this.findText(block, blockMap)

        const valueId = block.Relationships?.find((rel) => rel.Type === 'VALUE')
          ?.Ids?.[0]

        if (valueId && blockMap[valueId]) {
          const valueBlock = blockMap[valueId]
          const valueText = this.findText(valueBlock, blockMap)

          keyValuePairs[keyText.toLowerCase()] = valueText
          console.log(`-->${valueText}`)
        }
      }
    })

    const customerName =
      Object.keys(keyValuePairs).find(
        (key) =>
          key.toLowerCase().includes('customer') ||
          key.toLowerCase().includes('name'),
      ) || ''

    const Statement: StatementUpdate = {
      id: '',
      bankName: keyValuePairs['bank name'] || '',
      customerName: keyValuePairs[customerName.toLowerCase()] || '',
      customerNumber: keyValuePairs['customer number']
        ? keyValuePairs['customer number'].split(':')[1].split("'")[0]
        : '',
      accountType: keyValuePairs['account type'] || '',
      accountNumber:
        keyValuePairs['account number'] || keyValuePairs['account #'] || '',
      beginningBalance: keyValuePairs['beginning balance'] || '',
      endingBalance: keyValuePairs['ending balance'] || '',
      statementDate:
        keyValuePairs['statement date'] ||
        keyValuePairs['statement ending'] ||
        '',
      accountActivity: [],
    }

    return Statement
  }

  findText(block: Block, blockMap: Record<string, Block>): string {
    if (block.Text) return block.Text

    if (block.Relationships) {
      const textParts: string[] = []
      block.Relationships.forEach((relationship) => {
        relationship.Ids?.forEach((id) => {
          const childBlock = blockMap[id]
          if (childBlock?.Text) {
            textParts.push(childBlock.Text)
          }
        })
      })
      return textParts.join(' ')
    }
    return ''
  }

  dataFormatExpense(
    input: GetExpenseAnalysisCommandOutput,
  ): AccountActivityUpdate[] {
    // const rawData = fs.readFileSync('./expense.json', 'utf8')

    const data: GetExpenseAnalysisCommandOutput = input

    if (!data || !data.ExpenseDocuments) {
      throw new Error('No data found in analysis result')
    }
    const formattedData: AccountActivityUpdate[] = []

    data.ExpenseDocuments.forEach((doc) => {
      doc.LineItemGroups?.forEach((items) => {
        items.LineItems?.forEach((fields) => {
          const entry = {
            postDate: '',
            description: '',
            debit: '',
            credit: '',
            balance: '',
            category: '',
          }

          fields.LineItemExpenseFields?.forEach((expenseFields) => {
            const label = expenseFields.LabelDetection?.Text || ''
            const value = expenseFields.ValueDetection?.Text || ''

            switch (label.toLowerCase()) {
              case 'post date':
              case 'date':
                entry.postDate = value
                break
              case 'description':
                entry.description = value
                break
              case 'debits':
              case 'debit':
                entry.debit = value
                break
              case 'credits':
              case 'credit':
                entry.credit = value
                break
              case 'balance':
              case 'amount':
                entry.balance = value
                break
              default:
                break
            }
          })

          if (
            entry.postDate ||
            entry.description ||
            entry.debit ||
            entry.credit ||
            entry.balance
          ) {
            formattedData.push(entry)
          }
        })
      })
    })

    return formattedData
  }
}
