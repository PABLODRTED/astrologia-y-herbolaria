import dotenv from 'dotenv'
import path from 'path'
import { streamText } from 'ai'

dotenv.config({ path: path.resolve('.env.local') })

const apiKey = process.env.AI_GATEWAY_API_KEY
if (!apiKey) {
  throw new Error('AI_GATEWAY_API_KEY environment variable is not set')
}

async function generateText(): Promise<void> {
  const result = await streamText({
    model: 'openai/gpt-4-turbo',
    prompt: 'Explain quantum computing in simple terms.',
  })

  console.log('Streaming response:')
  console.log('---')

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk)
  }

  console.log('\n---')
  console.log('\nToken Usage:')
  const { usage } = await result
  console.log(`Input tokens: ${usage.promptTokens}`)
  console.log(`Output tokens: ${usage.completionTokens}`)
  console.log(`Total tokens: ${usage.totalTokens}`)
}

generateText().catch(error => {
  console.error('Error:', error.message)
  process.exit(1)
})
