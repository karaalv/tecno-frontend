/**
 * @description This page displays the rendered
 * document for the user to view. It fetches the
 * document content from the server and displays
 * it in a scrollable container. The user can
 * also download the document as a PDF file.
 */

// Components
import DocumentLoader from '@components/utils/DocumentLoader'

import { Download } from 'lucide-react'
import styles from '@/styles/components/pages/DocumentPage.module.css'

export default function DocumentPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>Document View</span>
                <div className={styles.download_button}>
                    <Download className={styles.download_icon} />
                </div>
            </div>
            {/* Document Content */}
            {/* <iframe
                src="https://docs.google.com/document/d/117W9isaokrBa4EV5nPlLSLwg6lGj5m8qdlWebGQ3Mtk/preview"
                className={styles.document_viewer}
                title="Document Viewer"
            /> */}
            <DocumentLoader />
        </div>
    )
}