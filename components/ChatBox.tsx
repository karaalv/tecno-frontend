'use client'
/**
 * @description This component is the 
 * chat box for the application. Used 
 * to enter messages.
 */

import { useState, useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'

// Styles
import styles from '@/styles/ChatBox.module.css'
import fonts from '@/styles/typography.module.css'

export default function ChatBox() {
    const [message, setMessage] = useState<string>('')
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

    useEffect(() => {
        console.log(message)
    }, [message])

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
                    rows={1}
                />
                {/* Icon */}
                <div className={styles.icon_container}>
                    <ArrowUp className={styles.icon} />
                </div>
            </div>
        </div>
    )
}