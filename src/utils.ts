export function setDateTimeStamp() {
    return new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
}