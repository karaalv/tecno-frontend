'use client'
/**
 * @description This is the chat page for the ESG 
 * application. It displays the chat messages
 * and the chat box for user input. The messages
 * are loaded from the server and displayed in the
 * chat section. The user can send messages and
 * receive responses from the agent.
 */

import { useState, useEffect, useRef } from 'react'

// Components
import ChatBox from '@/components/ChatBox'
import UserMessage from '@/components/UserMessage'
import AgentMessage from '@/components/AgentMessage'
import ErrorMessage from '@/components/ErrorMessage'
import ResponseLoader from '@/components/ResponseLoader'

// Context
import { useAppContext } from '@/contexts/AppContext'

// Types
import { AgentChatMemory } from '@/types/app.types'

// Styles
import styles from '@/styles/components/pages/ChatPage.module.css'

// Services
import { getOnboardingChatHistory } from '@/services/interface'

export default function OnboardingPage() {

    const { isLoading, setIsLoading } = useAppContext()
    const { error, setError } = useAppContext()
    const { isDocumentPanelOpen } = useAppContext()
    const [messages, setMessages] = useState<AgentChatMemory[]>([])
    const chatSectionRef = useRef<HTMLDivElement>(null)

    const loadData = async () => {
        setIsLoading(true)
        try {
            const data: AgentChatMemory[] = await getOnboardingChatHistory()
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
                {messages && renderMessages()}
                {isLoading && <ResponseLoader />}
                {error && renderError()}
            </div>
            {/* Chat Box */}
            <ChatBox 
                messages={messages} 
                setMessages={setMessages}
            />
        </div>
    )
}