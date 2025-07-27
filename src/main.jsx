import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { TranslationProvider } from './contexts/TranslationContext.jsx'
import { SpeechProvider } from './contexts/SpeechRecognitionContext.jsx'
import { TextToSpeechProvider } from './contexts/TextToSpeechContext.jsx'
import { TranslationHistoryProvider } from './contexts/TranslationHistoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TranslationProvider>
      <SpeechProvider>
        <TextToSpeechProvider>
          <TranslationHistoryProvider>
            <ToastContainer />
            <App />
          </TranslationHistoryProvider>
        </TextToSpeechProvider>
      </SpeechProvider>
    </TranslationProvider>
  </StrictMode>,
)
