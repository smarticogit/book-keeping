export type Report = {
  id: string
  clientId: string
  bankAccountId: string
}

export type ReportProps = Omit<Report, 'id'>
export type ReportRequest = ReportProps
export type ReportResponse = Report
