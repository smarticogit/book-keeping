import { AccountActivity } from '@prisma/client'

export interface TextractBlock {
  BlockType: string
  Confidence?: number
  Text?: string
  TextType?: string
  RowIndex?: number
  ColumnIndex?: number
  Geometry?: {
    BoundingBox?: {
      Width: number
      Height: number
      Left: number
      Top: number
    }
    Polygon?: {
      X: number
      Y: number
    }[]
  }
  Id?: string
  Relationships?: {
    Type: string
    Ids: string[]
  }[]
}

export interface TextractDocument {
  Blocks: TextractBlock[]
  DocumentMetadata?: {
    Pages: number
  }
  JobStatus?: string
  Warnings?: {
    ErrorCode: string
    Pages: number[]
  }[]
}

export type Output = {
  summaryData: { [key: string]: string }
  activities: {
    postDate?: string
    description?: string
    debits?: string
    credits?: string
    balance?: string
  }[]
}[]

export interface AccountResponse {
  bankName: string
  customerName: string
  customerNumber: string
  accountType: string
  accountNumber: string
  beginningBalance: string
  endingBalance: string
  statementDate: string
  activities: AccountActivity[]
}
