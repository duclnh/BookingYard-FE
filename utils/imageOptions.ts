import dotenv from 'dotenv';

dotenv.config();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const API_URL = process.env.NEXT_PUBLIC_API_URL
export function getImage(image: string | undefined) {
    if (image === undefined || image === null) {
        return undefined
    }
    if (image?.startsWith("https")) {   
        return image
    }
    return `${API_URL}${image}`
}

export function getImage360(image: string) {
    return `${BASE_URL}/_next/image?url=${getImage(image)}&w=1200&q=100`;
}