import { CreateReportUseCase } from '@/application/use-cases/create-report-use-case'
import { makeReport } from '@/tests/factories/make-report'
import { InMemoryReportRepository } from '@/tests/repositories/in-memory-report-repository'

let inMemoryReportRepository: InMemoryReportRepository
let sut: CreateReportUseCase

describe('Create Report', () => {
  beforeEach(() => {
    inMemoryReportRepository = new InMemoryReportRepository()
    sut = new CreateReportUseCase(inMemoryReportRepository)
  })

  it('should be able to a create a report', async () => {
    const newReport = makeReport()
    const reportCreated = await sut.run(newReport)

    expect(reportCreated.id).toBeTruthy()
  })
})
