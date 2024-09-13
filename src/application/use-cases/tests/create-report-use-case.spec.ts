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
    const spyCreate = vi.spyOn(inMemoryReportRepository, 'create')
    const newReport = makeReport()
    const reportCreated = await sut.run(newReport)

    const reportResponse = {
      props: {
        bankAccountId: reportCreated.bankAccountId,
        clientId: reportCreated.clientId,
      },
    }

    expect(reportCreated.id).toBeTruthy()
    expect(reportCreated.bankAccountId).toBe(reportResponse.props.bankAccountId)
    expect(spyCreate).toHaveBeenCalledTimes(1)
    expect(spyCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        clientId: reportResponse.props.clientId,
        bankAccountId: reportResponse.props.bankAccountId,
      }),
    )
  })
})
