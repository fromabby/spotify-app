export default function shortenText(text) {
    const LIMIT_NUMBER_OF_CHAR = 20
    if (text.length > LIMIT_NUMBER_OF_CHAR) {
        return `${text.substring(0, LIMIT_NUMBER_OF_CHAR)}...`
    }

    return text
}