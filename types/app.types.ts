/**
 * @description This file contains interfaces
 * and types used in the Tecno ESG application.
 */

/**
 * Interface representing a message
 * in the chat application.
 */
export interface Message {
    id: string;
    content: string;
    source: 'user' | 'agent';
}

export interface BackendResponse<T> {
    status: boolean;
    data?: {
        messages: T;
    };
}