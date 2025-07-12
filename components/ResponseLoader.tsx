/**
 * @description This component displays a loading 
 * icon for chat responses. It is used to indicate
 * that the application is waiting for a response
 * from the backend.
 */

import styles from '@/styles/components/ResponseLoader.module.css'

export default function ResponseLoader() {
    return (
        <div className={styles.loading_icon}/>
    )
}