/**
 * @description This component displays a
 * user message in the chat.
 */
import { FileText } from 'lucide-react'

// Styles
import fonts from '@/styles/common/typography.module.css'
import styles from '@/styles/components/UserMessage.module.css'

export default function UserMessage(
    { message, assets }: Readonly<{ message: string, assets?: string[] }>,
) {

    const renderAssets = () => {
        if (!assets || assets.length === 0) return <></>

        return (
            <div className={styles.assets_container}>
                {assets.map((asset, index) => (
                    <div 
                        key={index} 
                        className={`${styles.asset_item} ${fonts.body}`}
                    >
                        <FileText className={styles.asset_icon}/>
                        <span>{asset}</span>
                    </div>
                ))}
            </div>
        )
    }
    
    return (
        <div className={styles.user_message_wrapper}>
            {renderAssets()}
            <div className={
                `${styles.message_container} ${fonts.body}`
            }>
                {message}
            </div>
        </div>
    )
}