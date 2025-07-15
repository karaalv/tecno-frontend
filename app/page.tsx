'use client'
/**
 * @description This is the main page of the
 * Tecno ESG application. It displays the chat
 * messages and the chat box for user input.
 * The messages are loaded from the server and
 * displayed in the chat section.
 */

import { useState, useEffect, useRef } from 'react'

// Components
import ChatBox from '@/components/ChatBox'
import UserMessage from '@/components/UserMessage'
import AgentMessage from '@/components/AgentMessage'
import ErrorMessage from '@/components/ErrorMessage'
import ResponseLoader from '@/components/ResponseLoader'

// Types
import { AgentChatMemory } from '@/types/app.types'

// Styles
import styles from '@/styles/pages/onboarding_page.module.css'

// Services
import { getOnboardingChatHistory } from '@/services/interface'

export default function OnboardingPage() {

    const [messages, setMessages] = useState<AgentChatMemory[]>([])
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const chatSectionRef = useRef<HTMLDivElement>(null)

    const loadData = async () => {
        setIsLoading(true)
        try {
            const data: AgentChatMemory[] = await getOnboardingChatHistory()
            console.log('Loaded messages from server:')
            console.log(data)
            setMessages(data)
            setError('')
        } catch (err) {
            console.error('Error loading messages:', err)
            setError('Failed to load messages. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    const renderMessages = () => {
        return (
            messages.map((message: AgentChatMemory) => {
                if (message.source === 'user') {
                    return (
                        <UserMessage 
                            key={message.chat_id} 
                            message={message.content}
                            assets={message.assets || []}
                        />
                    )
                } else if (message.source === 'agent') {
                    return (
                        <AgentMessage 
                            key={message.chat_id} 
                            message={message.content}
                            assets={message.assets || []}
                        />
                    )
                }
            })
        )
    }

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatSectionRef.current) {
            chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        loadData()
    }, [])

    const renderError = () => {
        return (
            <ErrorMessage error={error}/>
        )
    }
    
    return (
        <div className={styles.main_container}>
            {/* Messages */}
            <div 
                ref={chatSectionRef} 
                className={styles.chat_section}
            >
                {renderMessages()}
                {isLoading && <ResponseLoader />}
                {error && renderError()}
            </div>
            {/* Chat Box */}
            <ChatBox 
                messages={messages} 
                setMessages={setMessages}
                setError={setError}
                setIsLoading={setIsLoading}
            />
        </div>
    )
}