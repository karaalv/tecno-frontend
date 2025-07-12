/**
 * @description This file contains utility functions
 * for processing data across the application.
 */

/**
 * Current timestamp in UTC. (ISO 8601)
 * 
 * @param dateString Optional date string to 
 * convert to timestamp.
 * @returns {string}
 */
export function getTimestamp(dateString?: string): string {
    const date = dateString ? new Date(dateString) : new Date()
    return date.toISOString()
}