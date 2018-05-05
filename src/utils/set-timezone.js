
export default function setTimezone(timezone) {
    if (!timezone) {
      return ''
    }
    
    return `;TZID=${timezone}`
}
