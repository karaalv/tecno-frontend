'use client'
/**
 * @description This is the main page of the
 * Tecno ESG application. It displays the chat
 * messages and the chat box for user input.
 * The messages are loaded from the server and
 * displayed in the chat section.
 */

import { useState, useEffect } from 'react'

// Components
import ChatBox from '@/components/ChatBox'
import UserMessage from '@/components/UserMessage'
import AgentMessage from '@/components/AgentMessage'

// Types
import { Message } from '@/types/app.types'

// Styles
import styles from '@/styles/page.module.css'

export default function Home() {

    const [messages, setMessages] = useState<Message[]>([])

    const loadData = async () => {
        // TO DO:: Load data from the server
        const data: Message[] = [
            {
                id: '1',
                content: 'Hello, how can I help you?',
                source: 'agent'
            },
            {
                id: '2',
                content: 'I need help with my account.',
                source: 'user'
            },
        ]
        setMessages(data)
    }

    const renderMessages = () => {
        return (
            messages.map((message: Message) => {
                if (message.source === 'user') {
                    return (
                        <UserMessage 
                            key={message.id} 
                            message={message.content} 
                        />
                    )
                } else if (message.source === 'agent') {
                    return (
                        <AgentMessage 
                            key={message.id} 
                            message={message.content} 
                        />
                    )
                }
            })
        )
    }

    useEffect(() => {
        loadData()
    }, [])
    
    return (
        <div className={styles.main_container}>
            {/* Messages */}
            <div className={styles.chat_section}>
                {renderMessages()}
            </div>
            {/* Chat Box */}
            <ChatBox />
        </div>
    )
}
