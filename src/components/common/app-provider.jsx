'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import RefreshToken from './refresh-token'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    }
})

export default function AppProvider({ children }) {
    return <QueryClientProvider client={queryClient}>
        <RefreshToken />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
}