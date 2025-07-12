/**
 * @description This component displays a
 * message from the agent in the chat.
 */
import ReactMarkdown from 'react-markdown'

// Styles
import fonts from '@/styles/common/typography.module.css'
import styles from '@/styles/components/AgentMessage.module.css'

export default function AgentMessage(
    { message }: Readonly<{ message: string }>,
) {
    return (
        <div className={`${styles.container} ${fonts.body}`}>
                <ReactMarkdown>
                    {message}
                </ReactMarkdown>
            <div 
                style={{
                    color: 'var(--Grey)',
                    fontWeight: '500',
                }}
            >
                {'Agent'}
            </div>
        </div>
    )
}