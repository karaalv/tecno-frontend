/**
 * @description This is the root layout 
 * for the Tecno ESG application. Metadata
 * and global styles are defined here.
 */

import type { Metadata } from "next"

// Styles
import styles from "@/styles/common/root.module.css"
import '@styles/common/globals.css'

// Context
import AppProvider from "@/contexts/AppContext"

export const metadata: Metadata = {
    title: "Tecno ESG",
}

export default function RootLayout(
    { children }: Readonly<{children: React.ReactNode}>
) {
    return (
        <html lang="en" className={styles.html}>
            <body>
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    )
}
