import { OCRTextractExpense } from './src/infra/services/ocr-expense-service'

async function runTest() {
  const ocrService = new OCRTextractExpense()

  try {
    await ocrService.run()
  } catch (error) {
    console.error('Erro ao executar o teste:', error)
  }
}

runTest()
