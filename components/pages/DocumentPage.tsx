'use client'
/**
 * @description This page displays the rendered
 * document for the user to view. It fetches the
 * document content from the server and displays
 * it in a scrollable container. The user can
 * also download the document as a PDF file.
 */
import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'

// Components
import DocumentLoader from '@components/utils/DocumentLoader'

// Styles
import styles from '@/styles/components/pages/DocumentPage.module.css'

// Services
import { getUserData } from '@/services/interface'

export default function DocumentPage() {
    const { isLoading, setIsLoading } = useAppContext()
    const { error, setError } = useAppContext()
    const [reportURL, setReportURL] = useState<string>('')

    const loadData = async () => {
        try {
            const userData = await getUserData()
            if (userData && userData.onboarding_report_url) {
                setReportURL(userData.onboarding_report_url)
            }
        } catch (err) {
            console.error('Error loading user data:', err)
            setError('Failed to load document. Please try again later.')
        }
    }

    useEffect(() => {
        loadData()
    }, [isLoading])

    const renderDocumentContent = () => {
        if (isLoading) {
            return <DocumentLoader />
        }

        if (!reportURL) {
            return (
                <div className={styles.no_document}>
                    No document available.
                </div>
            )
        }

        return (
            <iframe
                src={reportURL}
                className={styles.document_viewer}
                title="Document Viewer"
            />
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>Document View</span>
                <div className={styles.download_button}>
                    <Download className={styles.download_icon} />
                </div>
            </div>
            {/* Document Content */}
            {renderDocumentContent()}
        </div>
    )
}