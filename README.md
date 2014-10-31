ICS File Generator
==================

Generate [iCalendar](http://tools.ietf.org/html/rfc5545) files.

## Installation

`npm install ics`

## Usage

Require the module: `require('ics')`.

### `ics.createEvent(options, filepath, cb)`

Options:
- `eventName`: (string) Title of the event as it appears in calendar application
- `dtstart`: (Date) Event start time. Defaults to current time.
- `dtend`: (Date) Event end time. Defaults to one hour from `dtstart`.
- `filename`: (string) Name of the ical file. Defaults to `calendar-event.ics`.
- `organizer`: (object)
  - `name`: (string)
  - `email`: (string)


## Example:

```javascript
var ical = require('ics');

var options = {
  eventName: 'Fingerpainting lessons',
  fileName: 'event.ics',
  dtstart: 'Sat Nov 02 2014 13:15:00 GMT-0700 (PDT)',
  email: {
    name: 'Isaac Asimov',
    email: isaac@asimov.com'
  }
};

ical.createEvent(options, null, function(err, success) {
  if (err) {
    console.log(err);
  }

  console.log(success); // returns filepath
});
```

The above snippet creates a file named `event.ics`, saves it to the operating
system's temporary directory, and returns the filepath.

The `event.ics` file should look something like this:

```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:19970714T170000Z
ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com
DTSTART:19970714T170000Z
DTEND:19970715T035959Z
SUMMARY:Fingerpainting lessons
END:VEVENT
END:VCALENDAR
```
