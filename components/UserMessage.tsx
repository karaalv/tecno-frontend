/**
 * @description This component displays a
 * user message in the chat.
 */

// Styles
import fonts from '@/styles/common/typography.module.css'
import styles from '@/styles/components/UserMessage.module.css'

export default function UserMessage(
    { message }: Readonly<{ message: string }>,
) {
    
    return (
        <div className={styles.container}>
            <p className={fonts.body}>
                {message}
            </p>
        </div>
    )
}