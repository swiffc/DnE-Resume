import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('React main.tsx loading...')

try {
  const rootElement = document.getElementById('root')
  console.log('Root element found:', rootElement)
  
  if (!rootElement) {
    throw new Error('Root element not found')
  }

  const root = createRoot(rootElement)
  console.log('React root created successfully')
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  
  console.log('React app rendered successfully')
} catch (error) {
  console.error('Error initializing React app:', error)
  // Fallback display
  const rootElement = document.getElementById('root')
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
        <h1>Error Loading Portfolio</h1>
        <p>Error: ${error}</p>
        <p>Please check the browser console for more details.</p>
      </div>
    `
  }
} 