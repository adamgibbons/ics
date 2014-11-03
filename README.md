ICS File Generator
==================

Generate [iCalendar](http://tools.ietf.org/html/rfc5545) files.

[![npm version](https://badge.fury.io/js/ics.svg)](http://badge.fury.io/js/ics)
[![Code Climate](https://codeclimate.com/github/adamgibbons/ics/badges/gpa.svg)](https://codeclimate.com/github/adamgibbons/ics)
[![TravisCI build status](https://travis-ci.org/adamgibbons/ics.svg?branch=master)](https://travis-ci.org/adamgibbons/ics.svg?branch=master)

## Installation

`npm install ics`

## Usage

Require the module: `require('ics')`.

### `ics.getEvent(options)`

Returns an iCal-compliant text string.

### `ics.createEvent(options, filepath, cb)`

Returns a callback with an iCal-compliant `.ics` file.

### Options:
- `dtstart`: (Date string) Event start time. Defaults to current time.
- `dtend`: (Date string) Event end time. Defaults to one hour from `dtstart`.
- `description`: (String) Description (details) of the event.
- `eventName`: (String) Title of the event as it appears in calendar application
- `filename`: (String) Name of the iCal file. Defaults to `calendar-event.ics`.
- `organizer`: (Object)
  - `name`: (String)
  - `email`: (String)

## Example:

```javascript
var ical = require('ics');

var options = {
  eventName: 'Fingerpainting lessons',
  fileName: 'event.ics',
  dtstart: 'Sat Nov 02 2014 13:15:00 GMT-0700 (PDT)',
  email: {
    name: 'Isaac Asimov',
    email: 'isaac@asimov.com'
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
DTSTAMP:20150701T170000Z
ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com
DTSTART:20150714T170000Z
DTEND:20150715T035959Z
SUMMARY:Fingerpainting lessons
END:VEVENT
END:VCALENDAR
```

## TODO

- [x] Description property
- [ ] Add express/restify browser download examples
- [ ] [Recurrence Identifier Range](http://tools.ietf.org/html/rfc5545#section-3.2.13)
- [ ] [Alarm Trigger Relationship](http://tools.ietf.org/html/rfc5545#section-3.2.14)
- [ ] [Time Zone Identifier](http://tools.ietf.org/html/rfc5545#section-3.2.19)
- [ ] [Geographic Position](http://tools.ietf.org/html/rfc5545#section-3.8.1.6)
- [ ] [Location](http://tools.ietf.org/html/rfc5545#section-3.8.1.7)

## References

[RFC 5545: Internet Calendaring and Scheduling Core Object Specification (iCalendar)](http://tools.ietf.org/html/rfc5545)

[Initial iCalendar Elements Registries](http://tools.ietf.org/html/rfc5545#section-8.3)
