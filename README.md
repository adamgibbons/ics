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

### `ics.buildEvent(attributes)`

Returns an iCal-compliant text string.

### Options:
- `start`: STRING Optional. Event start time. Defaults to current time.
- `end`: STRING Optional. Event end time. Defaults to one hour from `dtstart`.
- `title`: STRING Optional. Title of the event as it appears in calendar application.
- `description`: STRING Optional. Description (details) of the event.
- `location`: STRING Optional. Defines intended venue.
- `url`: STRING Optional. URL associated with the event.
- `status`: STRING Optional. Must be one of: `tentative`, `confirmed`, `cancelled`.
- `geo`: FLOAT Optional. Geographic coordinates of the event. Two semicolon-separated float values specifying latitute and longitude of event.
- `attendees`: ARRAY Optional.
- `categories`: ARRAY Optional.


### Example:

```javascript
var ics = require('ics');

ics.buildEvent({
  start: '2016-05-30 06:50',
  end: '2016-05-30 15:00',
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
  location: 'Folsom Field, University of Colorado (finish line)',
  url: 'http://www.bolderboulder.com/',
  status: 'confirmed',
  geo: { lat: 40.0095, lon: 105.2669 },
  attendees: [
    {name: 'Adam Gibbons', email: 'adam@example.com'},
    {name: 'Brittany Seaton', email: 'brittany@example2.org'}
  ],
  categories: ['10k races', 'Memorial Day Weekend', 'Boulder\, CO']
});

```

The above snippet will return an iCal-compliant text string like this:

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

## References

[RFC 5545: Internet Calendaring and Scheduling Core Object Specification (iCalendar)](http://tools.ietf.org/html/rfc5545)