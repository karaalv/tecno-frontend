/**
 * @description This component displays a
 * message from the agent in the chat.
 */

// Styles
import fonts from '@/styles/common/typography.module.css'
import styles from '@/styles/components/AgentMessage.module.css'

export default function AgentMessage(
    { message }: Readonly<{ message: string }>,
) {
    
    return (
        <div className={styles.container}>
            <p className={fonts.body}>
                {message}
            </p>
            <div 
                className={fonts.body}
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