import * as fs from 'fs'

// Define a estrutura dos tipos com base no JSON fornecido
interface BoundingBox {
  Height: number
  Left: number
  Top: number
  Width: number
}

interface Polygon {
  X: number
  Y: number
}

interface Geometry {
  BoundingBox: BoundingBox
  Polygon: Polygon[]
}

interface Detection {
  Confidence: number
  Geometry: Geometry
  Text: string
}

interface SummaryField {
  PageNumber: number
  Type: Detection
  ValueDetection: Detection
}

interface TextractResult {
  SummaryFields: SummaryField[]
}

// Função para processar o arquivo JSON
function processTextractResult() {
  try {
    // Lê o arquivo textract-result.json
    const rawData = fs.readFileSync('textract-results.json', 'utf8')
    const data: TextractResult[] = JSON.parse(rawData)

    // Verifica se os dados foram carregados corretamente
    console.log('Dados carregados:', data)

    // Array para armazenar os objetos chave-valor
    const keyValuePairs: { [key: string]: string }[] = []

    // Verificação se os dados são um array
    if (!Array.isArray(data)) {
      throw new Error(
        'O conteúdo do arquivo textract-result.json não é um array válido.',
      )
    }

    // Percorre os documentos
    data.forEach((document) => {
      if (document.SummaryFields && Array.isArray(document.SummaryFields)) {
        document.SummaryFields.forEach((field) => {
          const chave = field.Type?.Text || ''
          const valor = field.ValueDetection?.Text || ''

          if (chave && valor) {
            // Adiciona o par como um objeto com chave dinâmica
            const keyValueObject: { [key: string]: string } = {}
            keyValueObject[chave] = valor
            keyValuePairs.push(keyValueObject)
          }
        })
      }
    })

    // Verifica se foram encontrados pares chave-valor
    console.log('Pares chave-valor encontrados:', keyValuePairs)

    // Grava o resultado em um novo arquivo JSON
    fs.writeFileSync('result.json', JSON.stringify(keyValuePairs, null, 2))

    console.log('Processamento concluído. Arquivo result.json gerado.')
  } catch (error) {
    const err = error as Error
    console.error('Erro ao processar o arquivo:', err.message)
  }
}

// Executa a função
processTextractResult()
