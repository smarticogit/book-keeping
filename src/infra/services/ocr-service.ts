import { OCRService } from '@/domain/services/ocr-service'
import {
  Block,
  FeatureType,
  GetDocumentAnalysisCommand,
  GetDocumentAnalysisCommandInput,
  StartDocumentAnalysisCommand,
  StartDocumentAnalysisCommandInput,
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

// const docName = 'statement01.pdf'
const docName = '0bf58e74-3778-4ab3-9287-c8f6fe1e6e4f.pdf'
const outputFileName = 'textract-results.json'

const params: StartDocumentAnalysisCommandInput = {
  DocumentLocation: {
    S3Object: {
      Bucket: env.S3_BUCKET_OCR,
      Name: docName,
    },
  },
  FeatureTypes: [FeatureType.FORMS, FeatureType.TABLES, FeatureType.QUERIES],
  QueriesConfig: {
    Queries: [
      {
        Text: 'What is the bank name?',
        Alias: 'Bank Name',
      },
      {
        Text: 'What is the customer name?',
        Alias: 'Customer Name',
      },
      {
        Text: 'What is the customer number?',
        Alias: 'Customer Number',
      },
      {
        Text: 'What is the account number?',
        Alias: 'Account Number',
      },
      {
        Text: 'What is the beginning balance?',
        Alias: 'Beginning Balance',
      },
      {
        Text: 'What is the ending balance?',
        Alias: 'Ending Balance',
      },
    ],
  },
}

export class OCRTextract implements OCRService {
  async analyze(): Promise<string> {
    try {
      const command = new StartDocumentAnalysisCommand(params)
      const response = await textractClient.send(command)

      if (!response.JobId) {
        throw new Error('Error analyze')
      }

      return response.JobId
    } catch (error) {
      console.error('Error analyze:', error)
      throw new Error('Error analyze')
    }
  }

  async getResults(jobId: string) {
    let jobStatus = ''
    let blocks: Block[] = []
    let nextToken: string | undefined

    console.log('Getting results...')

    do {
      try {
        const response = await textractClient.send(
          new GetDocumentAnalysisCommand({
            JobId: jobId,
          } as GetDocumentAnalysisCommandInput),
        )
        jobStatus = response.JobStatus!

        console.log(`Status: ${jobStatus}...`)

        if (jobStatus === 'SUCCEEDED') {
          break
        } else if (jobStatus === 'FAILED') {
          console.error('Analyze job failed.')
          if (response.StatusMessage) {
            console.error(`Error message: ${response.StatusMessage}`)
          }
          return
        } else {
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }
      } catch (error) {
        console.error('Error getting results:', error)
        throw new Error('Error getting results:')
      }
    } while (jobStatus !== 'SUCCEEDED' && jobStatus !== 'FAILED')

    do {
      try {
        const response = await textractClient.send(
          new GetDocumentAnalysisCommand({
            JobId: jobId,
            NextToken: nextToken,
          } as GetDocumentAnalysisCommandInput),
        )

        blocks = blocks.concat(response.Blocks || [])
        fs.writeFileSync('output-raw.json', JSON.stringify(response, null, 2))
        nextToken = response.NextToken
      } catch (error) {
        console.error('Erro ao obter resultados:', error)
        throw new Error('Erro ao processar os resultados do Textract')
      }
    } while (nextToken)

    const keyValues = extractKeyValuePairs(blocks)
    const tables = extractTables(blocks)
    const queriesResults = extractQueriesResults(blocks)
    const data = mapData(keyValues, tables, queriesResults)

    fs.writeFileSync(outputFileName, JSON.stringify(data, null, 2))
    console.log('Resultados obtidos com sucesso!')
    return data
  }

  async run() {
    try {
      const jobId = await this.analyze()
      await this.getResults(jobId)
    } catch (error) {
      console.error('Erro ao executar a análise:', error)
    }
  }
}

function extractQueriesResults(blocks: Block[]) {
  const queriesResults: { [alias: string]: string } = {}

  blocks.forEach((block) => {
    if (block.BlockType === 'QUERY_RESULT') {
      const alias = block.Query?.Alias || ''
      const text = block.Text || ''
      queriesResults[alias] = text
    }
  })

  return queriesResults
}

function extractKeyValuePairs(blocks: Block[]) {
  const keyMap: { [key: string]: Block } = {}
  const valueMap: { [key: string]: Block } = {}
  const blockMap: { [key: string]: Block } = {}
  const queriesResults: { [alias: string]: string } = {}

  blocks.forEach((block) => {
    if (block.Id) {
      blockMap[block.Id] = block
      if (block.BlockType === 'KEY_VALUE_SET') {
        if (block.EntityTypes && block.EntityTypes.includes('KEY')) {
          keyMap[block.Id] = block
        } else if (block.EntityTypes && block.EntityTypes.includes('VALUE')) {
          valueMap[block.Id] = block
        }
      }

      if (block.BlockType === 'QUERY_RESULT') {
        const alias = block.Query?.Alias || ''
        const text = block.Text || ''
        queriesResults[alias] = text
      }
    }
  })

  const keyValues: { [key: string]: string } = {}
  for (const keyBlockId in keyMap) {
    const keyBlock = keyMap[keyBlockId]
    const valueBlock = findValueBlock(keyBlock, valueMap)
    const key = getText(keyBlock, blockMap)
    const value = valueBlock ? getText(valueBlock, blockMap) : ''
    keyValues[key] = value
  }

  return keyValues
}

function findValueBlock(keyBlock: Block, valueMap: { [key: string]: Block }) {
  if (keyBlock.Relationships) {
    for (const relationship of keyBlock.Relationships) {
      if (relationship.Type === 'VALUE') {
        for (const valueId of relationship.Ids || []) {
          if (valueMap[valueId]) {
            return valueMap[valueId]
          }
        }
      }
    }
  }
  return null
}

function getText(block: Block, blockMap: { [key: string]: Block }): string {
  let text = ''

  if (block.Relationships) {
    for (const relationship of block.Relationships) {
      if (relationship.Type === 'CHILD') {
        for (const childId of relationship.Ids || []) {
          const word = blockMap[childId]
          if (word.BlockType === 'WORD') {
            text += word.Text + ' '
          } else if (word.BlockType === 'SELECTION_ELEMENT') {
            if (word.SelectionStatus === 'SELECTED') {
              text += 'X '
            }
          }
        }
      }
    }
  }

  return text.trim()
}

function extractTables(blocks: Block[]) {
  const blocksMap: { [key: string]: Block } = {}
  const tableBlocks: Block[] = []

  blocks.forEach((block) => {
    if (block.Id) {
      blocksMap[block.Id] = block
      if (block.BlockType === 'TABLE') {
        tableBlocks.push(block)
      }
    }
  })

  const tables = tableBlocks.map((tableBlock) => {
    const rows: string[][] = []
    const relationships = tableBlock.Relationships || []
    relationships.forEach((relationship) => {
      if (relationship.Type === 'CHILD') {
        relationship.Ids?.forEach((childId) => {
          const cell = blocksMap[childId]
          if (cell.BlockType === 'CELL') {
            const rowIndex = (cell.RowIndex || 1) - 1
            const colIndex = (cell.ColumnIndex || 1) - 1
            rows[rowIndex] = rows[rowIndex] || []
            rows[rowIndex][colIndex] = getText(cell, blocksMap)
          }
        })
      }
    })
    return rows
  })

  return tables
}

function mapData(
  keyValues: { [key: string]: string },
  tables: string[][][],
  queriesResults: { [alias: string]: string },
) {
  console.log('Pares Chave-Valor Extraídos:', keyValues)

  const bankName = queriesResults['Bank Name'] || keyValues['Bank Name'] || ''
  const phoneNumber =
    queriesResults['Phone Number'] || keyValues['Phone Number'] || ''
  const accountType =
    queriesResults['Account Type'] || keyValues['Account Type'] || ''
  const accountNumber =
    queriesResults['Account Number'] || keyValues['Account Number'] || ''
  const customerName =
    queriesResults['Customer Name'] ||
    keyValues['Account Holder'] ||
    keyValues['Customer Name'] ||
    ''
  let customerNumber = ''
  const beginningBalance =
    queriesResults['Beginning Balance'] ||
    keyValues['Beginning Balance'] ||
    keyValues['Saldo inicial'] ||
    ''
  const endingBalance =
    queriesResults['Ending Balance'] ||
    keyValues['Ending Balance'] ||
    keyValues['Saldo final'] ||
    ''
  const statementDate =
    queriesResults['Statement Date'] ||
    keyValues['Statement Date'] ||
    keyValues['Statement Ending'] ||
    keyValues.Date ||
    ''

  for (const key in keyValues) {
    if (key.startsWith('Customer Number')) {
      const match = key.match(/Customer Number:?(\d+)/)
      if (match) {
        customerNumber = match[1]
      } else {
        customerNumber = keyValues[key]
      }
    }
  }

  let activitiesTable: string[][] = []
  for (const table of tables) {
    const headers = table[0]?.map((header) => header.toLowerCase())
    if (
      headers &&
      (headers.includes('post date') || headers.includes('date')) &&
      headers.includes('description') &&
      (headers.includes('debits') ||
        headers.includes('credits') ||
        headers.includes('balance'))
    ) {
      activitiesTable = table
      break
    }
  }

  const activities: {
    postDate?: string
    description?: string
    debits?: string
    credits?: string
    balance?: string
  }[] = []
  if (activitiesTable.length > 1) {
    const headerRow = activitiesTable[0]
    for (let i = 1; i < activitiesTable.length; i++) {
      const row = activitiesTable[i]
      const activity: {
        postDate?: string
        description?: string
        debits?: string
        credits?: string
        balance?: string
      } = {}
      for (let j = 0; j < headerRow.length; j++) {
        const header = headerRow[j]?.toLowerCase()
        const value = row[j]
        if (header.includes('post date') || header.includes('date')) {
          activity.postDate = value
        } else if (header.includes('description')) {
          activity.description = value
        } else if (header.includes('debits') || header.includes('debit')) {
          activity.debits = value
        } else if (header.includes('credits') || header.includes('credit')) {
          activity.credits = value
        } else if (header.includes('balance')) {
          activity.balance = value
        }
      }
      activities.push(activity)
    }
  }

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
