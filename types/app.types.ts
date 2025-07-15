/**
 * @description This file contains interfaces
 * and types used in the Tecno ESG application.
 */

// --- Backend Types ---

export interface AgentChatMemory {
    user_id: string;
    chat_id: string;
    timestamp: string;
    content: string;
    source: 'agent' | 'user';
    agent_name: string;
    assets: string[] | null;
}

export interface BackendResponse<T> {
    success: boolean;
    data: T | null;
    error: string | null;
}

export interface UserData {
    user_id: string;
    has_onboarded: boolean;
    documents: string[];
    onboarding_report_url: string | null;
}

// --- Frontend Types ---

export interface AppContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
    isDocumentPanelOpen: boolean;
    setIsDocumentPanelOpen: (open: boolean) => void;
}