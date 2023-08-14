# RFC5545 - Notes

## 3.2.19.  Time Zone Identifier

This parameter MUST be specified on the "DTSTART", "DTEND", "DUE", "EXDATE", and "RDATE" properties when either a DATE-TIME or TIME value type is specified and when the value is neither a UTC or a "floating" time.

The "TZID" property parameter MUST NOT be applied to DATE properties and DATE-TIME or TIME properties whose time values are specified in UTC.

The use of local time in a DATE-TIME or TIME value without the "TZID" property parameter is to be interpreted as floating time, regardless of the existence of "VTIMEZONE" calendar components in the iCalendar object.

Examples of this property parameter:
```
DTSTART;TZID=America/New_York:19980119T020000
DTEND;TZID=America/New_York:19980119T030000
```

## 3.3.5.  Date-Time

The "DATE-TIME" value type expresses time values in three forms:

### FORM #1: DATE WITH LOCAL TIME
January 18, 1998, at 11 PM:
```
19980118T230000
```

### FORM #2: DATE WITH UTC TIME
January 19, 1998, at 0700 UTC:
```
19980119T070000Z
```

### FORM #3: DATE WITH LOCAL TIME AND TIME ZONE REFERENCE
2:00 A.M. in New York on January 19, 1998:
```
TZID=America/New_York:19980119T020000
```

## 3.6.1.  Event Component

### REQUIRED, MUST NOT occur more than once
- [x] dtstamp
- [x] uid

### REQUIRED when METHOD is not specified, MUST NOT occur more than once
- [x] dtstart

### OPTIONAL but MUST NOT occur more than once
- [x] class
- [ ] created
- [x] description
- [x] geo
- [ ] last-mod
- [x] location
- [x] organizer
- [ ] priority
- [ ] seq
- [x] status
- [x] summary
- [x] transp
- [x] url
- [ ] recurid

Either 'dtend' or 'duration' MAY appear in a 'eventprop', but 'dtend' and 'duration' MUST NOT occur in the same 'eventprop'.

- [x] dtend
- [ ] duration

The following are OPTIONAL, and MAY occur more than once.
- [ ] attach
- [x] attendee
- [x] categories
- [ ] comment
- [ ] contact
- [ ] exdate
- [ ] rstatus
- [ ] related
- [ ] resources
- [ ] rdate
- [ ] x-prop
- [ ] iana-prop


## 3.8.2.4.  Date-Time Start
- Property Name:  `DTSTART`
- Value Type:  The default value type is DATE-TIME.  The time value MUST be one of the forms defined for the DATE-TIME value type. The value type can be set to a DATE value type.

3.8.2.2.  Date-Time End
