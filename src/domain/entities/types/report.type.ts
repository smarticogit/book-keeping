export type Report = {
  id: string
  clientId: string
  bankAccountId: string
}

export type ReportProps = Omit<Report, 'id'>
