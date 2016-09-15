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

### `ics.getCalendar(calendarOptions)`

Returns an iCal-compliant text string.

### `ics.createCalendar(calendarOptions, filePath, callback)`

Returns a callback with the file path to an iCal-compliant `.ics` file.

### Event options:

- `events`: (array of [Event options](#eventOptions))
- `filename`: (String) Name of the iCal file. Defaults to `calendar-event.ics`.

## Example:

```javascript
var ical = require('ics');

var options = {
  events: [
    {
      eventName: 'Fingerpainting lessons',
      filename: 'event.ics',
      dtstart: '2014-11-02T13:15:00',
      location: 'Here and there',
      email: {
        name: 'Isaac Asimov',
        email: 'isaac@asimov.com'
      }
    }
  ]
};

ical.createCalendar(options, null, function(err, generatedFilePath) {
  if (err) {
    console.log(err);
  }

  console.log(generatedFilePath);
});
```

The above snippet creates a file named `event.ics`, saves it to the operating
system's temporary directory, and returns the filepath.

The `event.ics` file should look something like this:

```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP;TZID=America/Denver:20150701T170000
ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com
DTSTART;TZID=America/Denver:20150714T170000
DTEND;TZID=America/Denver:20150715T035959
SUMMARY:Fingerpainting lessons
END:VEVENT
END:VCALENDAR
```

## Deprecated methods

These should be removed in a future release. To migrate your code, use `getCalendar` instead of `getEvent` and `createCalendar` instead of `createEvent`.

### `ics.getEvent(eventOptions)`

Returns an iCal-compliant text string.

### `ics.createEvent(eventOptions, filePath, callback)`

Returns a callback with the file path to an iCal-compliant `.ics` file.

### <a name="eventOptions"></a>Event options:

- `dtstart`: (Date string) Event start time. Defaults to current time.
- `dtend`: (Date string) Event end time. Defaults to one hour from `dtstart`.
- `description`: (String) Description (details) of the event.
- `eventName`: (String) Title of the event as it appears in calendar application
- `filename`: (String) Name of the iCal file. Defaults to `calendar-event.ics`.
- `location`: (String) Location of the event.
- `organizer`: (Object)
  - `name`: (String)
  - `email`: (String)
- `attendees`: (Object)
  - `name`: (String)
  - `email`: (String)
  - `rsvp`: (Boolean) Defaults to `false`.

## Example:

```javascript
var ical = require('ics');

var options = {
  eventName: 'Fingerpainting lessons',
  filename: 'event.ics',
  dtstart: '2014-11-02T13:15:00',
  location: 'Here and there',
  email: {
    name: 'Isaac Asimov',
    email: 'isaac@asimov.com'
  }
};

ical.createEvent(options, null, function(err, generatedFilePath) {
  if (err) {
    console.log(err);
  }

  console.log(generatedFilePath);
});
```

The above snippet creates a file named `event.ics`, saves it to the operating
system's temporary directory, and returns the file path.

The `event.ics` file should look something like this:

```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP;TZID=America/Denver:20150701T170000
ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com
DTSTART;TZID=America/Denver:20150714T170000
DTEND;TZID=America/Denver:20150715T035959
SUMMARY:Fingerpainting lessons
END:VEVENT
END:VCALENDAR
```

## TODO

- [x] Description property
- [x] Add express/restify browser download examples
- [x] Add Attendees
- [x] [Time Zone Identifier](http://tools.ietf.org/html/rfc5545#section-3.2.19)
- [x] Multiple events in one go
- [x] UNIX systems
- [ ] [Recurrence Identifier Range](http://tools.ietf.org/html/rfc5545#section-3.2.13)
- [ ] [Alarm Trigger Relationship](http://tools.ietf.org/html/rfc5545#section-3.2.14)
- [ ] [Geographic Position](http://tools.ietf.org/html/rfc5545#section-3.8.1.6)
- [ ] [Location](http://tools.ietf.org/html/rfc5545#section-3.8.1.7)

## References

[RFC 5545: Internet Calendaring and Scheduling Core Object Specification (iCalendar)](http://tools.ietf.org/html/rfc5545)

[Initial iCalendar Elements Registries](http://tools.ietf.org/html/rfc5545#section-8.3)

## EXAMPLE

Check out our expressjs example.Follow the instructions below to try it out
`npm install`
`cd ex`
`node app.js`

Then go over to the browser and hit this url
`http://localhost:3000/create`

A file will be created and your can reach it in the browser here
`localhost:3000/created/example.ics`
