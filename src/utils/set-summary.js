export default function setSummary(summary) {
    return summary.replace(/\r?\n/gm, "\\n").replace(/;/gm, "\\;").replace(/:/gm, "\\:")
}
