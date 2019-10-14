export function sortAsc(items: any[]): any[] {
    return items.slice(0).sort((item1, item2) => {
        const sequence1 = item1.sequence;
        const sequence2 = item2.sequence;
        return sequence1 > sequence2
            ? 1
            : sequence2 > sequence1
                ? -1
                : 0;
    });
}
