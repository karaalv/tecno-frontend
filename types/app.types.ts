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
}

export interface BackendResponse<T> {
    success: boolean;
    data: T | null;
    error: string | null;
}