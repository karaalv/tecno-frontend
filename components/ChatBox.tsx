'use client'
/**
 * @description This component is the 
 * chat box for the application. Used 
 * to enter messages.
 */

import { useState, useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'

// Types
import { Message } from '@/types/app.types'

// Services
import { chatBot } from '@/services/backend'

// Styles
import styles from '@/styles/ChatBox.module.css'
import fonts from '@/styles/typography.module.css'

interface ChatBoxProps {
    messages: Message[]
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export default function ChatBox({ messages, setMessages }: ChatBoxProps) {
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const chatInput = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const textArea = event.currentTarget
        
        // Reset height to auto to get the correct scrollHeight
        textArea.style.height = 'auto'
        
        // Set height based on scroll height, but respect min and max heights
        const maxHeight = parseInt(getComputedStyle(textArea).maxHeight)
        const newHeight = Math.min(textArea.scrollHeight, maxHeight)
        textArea.style.height = `${newHeight}px`

        setMessage(event.target.value)
    }

    const sendMessage = async () => {
        if (!message.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            content: message.trim(),
            source: 'user'
        }

        // Add user message to the chat
        setMessages(prev => [...prev, userMessage])
        
        // Clear input and reset height
        setMessage('')
        if (inputRef.current) {
            inputRef.current.style.height = 'auto'
        }

        setIsLoading(true)

        try {
            // Send message to backend and get response
            const responseMessages = await chatBot(userMessage.content)
            
            // Add response messages to the chat
            setMessages(responseMessages)
        } catch (error) {
            console.error('Error sending message:', error)
            // Optionally add an error message to the chat
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: 'Sorry, there was an error processing your message.',
                source: 'agent'
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.sub_container}>
                {/* Input */}
                <textarea
                    ref={inputRef}
                    className={`${styles.chat_input} ${fonts.body}`}
                    placeholder='Type your message here...'
                    value={message}
                    onChange={chatInput}
                    onKeyDown={handleKeyPress}
                    disabled={isLoading}
                    rows={1}
                />
                {/* Icon */}
                <div 
                    className={styles.icon_container}
                    onClick={sendMessage}
                    style={{ 
                        cursor: message.trim() && !isLoading ? 'pointer' : 'default',
                        opacity: message.trim() && !isLoading ? 1 : 0.5 
                    }}
                >
                    {isLoading ? (
                        <div className={styles.loading_square} />
                    ) : (
                        <ArrowUp className={styles.icon_con} />
                    )}
                </div>
            </div>
        </div>
    )
}