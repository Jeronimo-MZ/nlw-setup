export function calculatePercentage(completed: number, total: number) {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
}
