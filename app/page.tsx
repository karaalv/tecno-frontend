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
import ProgressBar from '@/components/ProgressBar'

// Types
import { Message } from '@/types/app.types'

// Styles
import styles from '@/styles/page.module.css'

// Services
import { chatBot } from '@/services/backend'

export default function Home() {

    //const data = {                      //THIS IS PROGRESS BAR SAMPLE DATA -- FOR TESTING PURPOSES
    //    group1: ["value1", "value2"],
    //    group2: [null],
    //    group3: ["filled", 123],
    //    group4: [undefined],
    //};                                  //PROGRESS BAR DATA ENDS HERE

    const [messages, setMessages] = useState<Message[]>([])
    const [progressData, setProgressData] = useState<Record<string, any[]>>({});
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

    //Typecast Json fields into desired fields
    type OrgData = {
    org_name: string;
    org_version: string;
    org_private: boolean;
    org_scripts: Record<string, string>;
    org_dependencies: Record<string, string>;
    org_devDependencies: Record<string, string | null>;
    };

    useEffect(() => {
        const fetchProgressData = async () => {
            const res = await fetch("/demo.json");
            const json: OrgData = await res.json();

            const transformed: Record<string, any[]> = {
                Scripts: Object.values(json.org_scripts || {}),
                Dependencies: Object.values(json.org_dependencies || {}),
                DevDependencies: Object.values(json.org_devDependencies || {}),
                Metadata: [json.org_name, json.org_version, json.org_private],
            };

            console.log("Transformed progress data:", transformed);
            setProgressData(transformed);
        };

        fetchProgressData(); // initial fetch

        const interval = setInterval(fetchProgressData, 10); // refresh every 4s

        return () => clearInterval(interval); // cleanup
    }, []);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatSectionRef.current) {
            chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        loadData()
    }, [])
    
    console.log(progressData)
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
            {/* Progress Bar */} 
            <ProgressBar data={progressData} />
        </div>
    )
}
