'use client'
/**
 * @description This component is the 
 * chat box for the application. Used 
 * to enter messages.
 */

import { useState, useRef } from 'react'
import { ArrowUp, Paperclip, FileText, X } from 'lucide-react'
import { getTimestamp } from '@/utils/processing'

// Types
import { AgentChatMemory } from '@/types/app.types'

// Services
import { messageOnboardingChat, uploadFiles } from '@/services/interface'

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
    const [files, setFiles] = useState<File[]>([])
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

    const fileInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles = Array.from(event.target.files || [])
        setFiles(prev=> [...prev, ...selectedFiles])
        // Reset input value to allow re-uploading the same file
        event.target.value = ''
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
        const messageToSend = message.trim()

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
            let responseMessage: AgentChatMemory | null = null
            
            if (files.length > 0) {
                const filesToUpload = files
                setFiles([])

                // Upload files and get file upload response
                responseMessage = await uploadFiles(
                    userId,
                    messageToSend,
                    filesToUpload
                )
            } else {
                // Send regular message
                responseMessage = await messageOnboardingChat(
                    userId,
                    messageToSend
                )
            }

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

    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const renderFilesPreview = () => {
        if (files.length === 0) {
            return <></>
        }

        return (
            <div className={styles.files_preview}>
                {files.map((file, index) => (
                    <div key={index} className={styles.file_item}>
                        <FileText className={styles.file_icon} />
                        <span className={fonts.body}>{file.name}</span>
                        <X 
                            className={styles.remove_file_button}
                            onClick={() => removeFile(index)}
                        />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={styles.main_container}>
            {/* Selected files */}
            <div className={styles.selected_files_container}>
                {renderFilesPreview()}
            </div>
            <div className={styles.sub_container}>
                {/* File Upload */}
                <div className={styles.file_upload_container}>
                    <Paperclip className={styles.file_upload_icon} />
                    <input
                        type="file"
                        multiple={true}
                        accept=".doc,.docx,.pdf,.txt"
                        onChange={fileInput}
                        className={styles.file_input}
                    />
                </div>
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