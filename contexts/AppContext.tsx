'use client'
/**
 * @description This file contains the context
 * for the application, providing global state
 * management.
 */

import { createContext, useContext, useState, ReactNode} from 'react'

// Types
import { AppContextType } from '@/types/app.types'

// Context
const appContext = createContext<AppContextType | undefined>(undefined)

// --- Context Hook ---

export const useAppContext = () => {
    const context = useContext(appContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}

// --- Context Provider ---

export default function AppProvider(
    {children}: {children: ReactNode}
){
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [isDocumentPanelOpen, setIsDocumentPanelOpen] = useState<boolean>(false)

    const value: AppContextType = {
        isLoading,
        setIsLoading,
        error,
        setError,
        isDocumentPanelOpen,
        setIsDocumentPanelOpen,
    }

    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}