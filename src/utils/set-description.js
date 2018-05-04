export default function setDescription(description) {
    return description.replace(/\r?\n/gm, "\\n").replace(/;/gm, "\\;").replace(/:/gm, "\\:")
}
