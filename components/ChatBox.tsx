'use client'
/**
 * @description This component is the 
 * chat box for the application. Used 
 * to enter messages.
 */

import { useState, useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { getTimestamp } from '@/utils/processing'

// Types
import { AgentChatMemory } from '@/types/app.types'

// Services
import { messageOnboardingChat } from '@/services/interface'

// Styles
import styles from '@/styles/components/ChatBox.module.css'
import fonts from '@/styles/common/typography.module.css'

interface ChatBoxProps {
    messages: AgentChatMemory[]
    setMessages: React.Dispatch<React.SetStateAction<AgentChatMemory[]>>
    setError: React.Dispatch<React.SetStateAction<string>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatBox(
    { messages, setMessages, setError, setIsLoading }: ChatBoxProps
) {
    const userId = 'user_001'
    const agentName = 'onboarding_agent'
    const [message, setMessage] = useState<string>('')
    const [isLoadingBox, setIsLoadingBox] = useState<boolean>(false)
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
        
        if (!message.trim() || isLoadingBox) {
            return
        }

        const userMessage: AgentChatMemory = {
            user_id: userId,
            chat_id: `${userId}-${agentName}-${getTimestamp()}`,
            timestamp: getTimestamp(),
            content: message.trim(),
            source: 'user',
            agent_name: agentName
        }

        // Add user message to the chat
        setMessages(prev => [...prev, userMessage])
        
        // Clear input and reset height
        setMessage('')
        if (inputRef.current) {
            inputRef.current.style.height = 'auto'
        }

        setIsLoading(true)
        setIsLoadingBox(true)

        try {
            // Send message to backend and get response
            const responseMessage = await messageOnboardingChat(
                userId,
                message.trim()
            )
            
            // Add response messages to the chat
            setMessages(prev => [...prev, responseMessage!])
            setError('')
        } catch (error) {
            console.error('Error sending message:', error)
            setError('Failed to send message. Please try again later.')
        } finally {
            setIsLoading(false)
            setIsLoadingBox(false)
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
                    disabled={isLoadingBox}
                    rows={1}
                />
                {/* Icon */}
                <div 
                    className={styles.icon_container}
                    onClick={sendMessage}
                    style={{ 
                        cursor: message.trim() && !isLoadingBox ? 'pointer' : 'default',
                        opacity: message.trim() && !isLoadingBox ? 1 : 0.5 
                    }}
                >
                    {isLoadingBox ? (
                        <div className={styles.loading_square} />
                    ) : (
                        <ArrowUp className={styles.icon_con} />
                    )}
                </div>
            </div>
        </div>
    )
}