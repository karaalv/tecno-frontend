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
            {
                id: '3',
                content: 'Sure, I can assist you with that.',
                source: 'agent'
            },
            {
                id: '4',
                content: 'Thank you!',
                source: 'user'
            },
            {
                id: '5',
                content: 'You are welcome.',
                source: 'agent'
            },
            {
                id: '6',
                content: 'What is the status of my order?',
                source: 'user'
            },
            {
                id: '7',
                content: 'Your order is being processed.',
                source: 'agent'
            },
            {
                id: '8',
                content: 'When will it be delivered?',
                source: 'user'
            },
            {
                id: '9',
                content: 'It will be delivered within 3-5 business days.',
                source: 'agent'
            }
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
            <div className={styles.chat_section}>
                {renderMessages()}
            </div>

            {/* Main Container */}
            {/* Chat Box */}
            <ChatBox />
        </div>
    )
}
