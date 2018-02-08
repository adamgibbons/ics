export default function setDescription(description) {
    return description.replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/:/g, "\\:")
}
