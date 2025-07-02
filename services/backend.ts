/**
 * @description This file acts as an interface
 * to the backend services.
 */

// Types
import { Message, BackendResponse } from '@/types/app.types';


/**
 * Sends a message to the chat bot
 * and returns the response, note 
 * to start the session the first
 * message is null.
 * 
 * @param message 
 * @returns {Promise<BackendResponse<Message[]>>}
 */
export async function chatBot(
    message: string | null
): Promise<Message[]> {
    
    const response = await fetch(
        'http://127.0.0.1:3001/chat', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: message}),
        }
    )

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json() as BackendResponse<Message[]>
    return data.data?.messages || [];
}