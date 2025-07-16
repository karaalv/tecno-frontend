/**
 * @description This component displays an
 * error message in the chat box. It is used
 * to inform the user about errors that occur
 * during the chat interaction.
 */

import styles from '@/styles/components/ErrorMessage.module.css'

export default function ErrorMessage(
    { error }: Readonly<{ error: string }>,
) {
    return (
        <div className={styles.container}>
            {error}
        </div>
    )
}