export function convertNumberToPrice(minPrice: number, maxPrice?: number): string {
    const formatter = new Intl.NumberFormat('vi-VN');

    if (maxPrice !== undefined) {
        return `${formatter.format(minPrice)} - ${formatter.format(maxPrice)} đ`;
    } else {
        return `${formatter.format(minPrice)} đ`;
    }
}