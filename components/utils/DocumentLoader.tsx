/**
 * @description This file is a loading screen
 * for the document viewer.
 */

import styles from '@/styles/components/utils/DocumentLoader.module.css'

export default function DocumentLoader() {
    return (
        <div className={styles.loader_container}>            
            <div className={styles.shimmer_lines}>
                <div className={`${styles.shimmer} ${styles.line_long}`}></div>
                <div className={`${styles.shimmer} ${styles.line_long}`}></div>
                <div className={`${styles.shimmer} ${styles.line_long}`}></div>
                <div className={`${styles.shimmer} ${styles.line_medium}`}></div>
                
                <div className={styles.paragraph_break}></div>
                
                <div className={`${styles.shimmer} ${styles.line_long}`}></div>
                <div className={`${styles.shimmer} ${styles.line_long}`}></div>
                <div className={`${styles.shimmer} ${styles.line_short}`}></div>
                
                <div className={styles.paragraph_break}></div>
                
                <div className={`${styles.shimmer} ${styles.line_long}`}></div>
                <div className={`${styles.shimmer} ${styles.line_long}`}></div>
                <div className={`${styles.shimmer} ${styles.line_medium}`}></div>
                <div className={`${styles.shimmer} ${styles.line_long}`}></div>
            </div>
        </div>
    )
}