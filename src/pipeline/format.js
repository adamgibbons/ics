import {
    setAlarm,
    setContact,
    setOrganizer,
    setDate,
    setDescription,
    setGeolocation,
    formatDuration
} from '../utils'

export default function formatEvent(attributes = {}) {
    const {
        title,
        productId,
        uid,
        timestamp,
        start,
        startType,
        duration,
        end,
        description,
        url,
        geo,
        location,
        status,
        categories,
        organizer,
        attendees,
        alarms
    } = attributes;

    let icsFormat = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'CALSCALE:GREGORIAN',
        `PRODID:${productId}`,
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `SUMMARY:${title}`,
        `DTSTAMP:${timestamp}`,
        `DTSTART:${setDate(start, startType)}`
    ];

    if (end) icsFormat.push(`DTEND:${setDate(end, startType)}`);
    if (description) icsFormat.push(`DESCRIPTION:${setDescription(description)}`);
    if (url) icsFormat.push(`URL:${url}`);
    if (geo) icsFormat.push(`GEO:${setGeolocation(geo)}`);
    if (location) icsFormat.push(`LOCATION:${location}`);
    if (status) icsFormat.push(`STATUS:${status}`);
    if (categories) icsFormat.push(`CATEGORIES:${categories}`);
    if (organizer) icsFormat.push(`ORGANIZER;${setOrganizer(organizer)}`);

    if (attendees) {
        icsFormat = icsFormat.concat(attendees.map(attendee => `ATTENDEE;${setContact(attendee)}`));
    }

    if (alarms) {
        icsFormat = icsFormat.concat(alarms.map(alarm => setAlarm(alarm)));
    }

    if (duration) icsFormat.push(`DURATION:${formatDuration(duration)}`);
    icsFormat = icsFormat.concat(`END:VEVENT`, `END:VCALENDAR`);

    return icsFormat
        .map(line => {
            let res = line.substr(0, 70);
            for (let i = 70; i < line.length; i += 70) {
                res += line.substr(i, i + 70) + "\r\n ";
            }
            return res;
        })
        .join("\r\n");
}
