const baseUrl = "http://localhost:5223"

export function getImage(image: string | undefined) {
    if (image === undefined || image === null) {
        return undefined
    }
    if (image?.startsWith("https")) {
        return image
    }
    return `${baseUrl}${image}`
}