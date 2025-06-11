export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function formatDateString(date: string): string {
    return new Date(date).toISOString().split('T')[0];
}