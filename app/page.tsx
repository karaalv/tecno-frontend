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

// Types
import { Message } from '@/types/app.types'

// Styles
import styles from '@/styles/pages/onboarding_page.module.css'

// Services
import { chatBot } from '@/services/backend'

export default function Home() {

    const [messages, setMessages] = useState<Message[]>([])
    const chatSectionRef = useRef<HTMLDivElement>(null)

    const loadData = async () => {
        // TO DO:: Load data from the server
        const data: Message[] = await chatBot(null)
        console.log('Loaded messages from server:')
        console.log(data)
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

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatSectionRef.current) {
            chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        loadData()
    }, [])
    
    return (
        <div className={styles.main_container}>
            {/* Messages */}
            <div 
                ref={chatSectionRef} 
                className={styles.chat_section}
            >
                {renderMessages()}
            </div>
            {/* Chat Box */}
            <ChatBox 
                messages={messages} 
                setMessages={setMessages} 
            />
        </div>
    )
}
