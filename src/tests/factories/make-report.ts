import { Report } from '@/domain/entities/report.entity'
import { faker } from '@faker-js/faker'

export function makeReport(override: Partial<Report> = {}) {
  const report = Report.create({
    bankAccountId: faker.string.uuid(),
    clientId: faker.string.uuid(),
    ...override,
  })

  return report
}
