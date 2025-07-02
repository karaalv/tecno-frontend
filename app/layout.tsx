/**
 * @description This is the root layout 
 * for the Tecno ESG application. Metadata
 * and global styles are defined here.
 */

import type { Metadata } from "next"

// Styles
import styles from "@/styles/root.module.css"
import '@styles/globals.css'

export const metadata: Metadata = {
    title: "Tecno ESG",
}

export default function RootLayout(
    { children }: Readonly<{children: React.ReactNode}>
) {
    return (
        <html lang="en" className={styles.html}>
            <body>
                {children}
            </body>
        </html>
    )
}
