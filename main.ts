import { OCRTextract } from './src/infra/services/ocr-service'

async function runTest() {
  const ocrService = new OCRTextract()

  try {
    await ocrService.run()
  } catch (error) {
    console.error('Erro ao executar o teste:', error)
  }
}

runTest()
