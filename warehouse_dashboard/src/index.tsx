import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './modules/app/App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryClient } from './shared/ReactQuery/QueryClient.ts'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './modules/auth/AuthContext.tsx'
import { ConfigProvider } from 'antd'
import { PalletteEnum } from './shared/pallete/PalleteEnum.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={ReactQueryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ConfigProvider theme={{ token: { colorPrimary: PalletteEnum.primary } }}>
            <App />
          </ConfigProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
