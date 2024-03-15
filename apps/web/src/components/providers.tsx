'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai'
import { useState } from 'react'
import { ThemeProvider } from './theme-provider'

type Props = {
  children: React.ReactNode
}
export function Providers({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 10,
          },
        },
      }),
  )

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ReactQueryDevtools position={'bottom'} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
