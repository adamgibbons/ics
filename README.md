ics
==================

The [iCalendar](http://tools.ietf.org/html/rfc5545) generator

[![npm version](https://badge.fury.io/js/ics.svg)](http://badge.fury.io/js/ics)
[![Code Climate](https://codeclimate.com/github/adamgibbons/ics/badges/gpa.svg)](https://codeclimate.com/github/adamgibbons/ics)
[![TravisCI build status](https://travis-ci.org/adamgibbons/ics.svg?branch=master)](https://travis-ci.org/adamgibbons/ics.svg?branch=master)

## Install

`npm install -S ics`

## Example Usage

Generate an iCalendar event:

```javascript
var ICS = require('ics');

var ics = new ICS();

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
    { name: 'Adam Gibbons', email: 'adam@example.com' },
    { name: 'Brittany Seaton', email: 'brittany@example2.org' }
  ],
  categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO']
});

```

The above snippet will return this:

```
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//Adam Gibbons//agibbons.com//ICS: iCalendar Generator
BEGIN:VEVENT
UID:2073c980-9545-11e6-99f9-791bff9883ed
DTSTAMP:20161018T151121Z
DTSTART:20160530T065000
DTEND:20160530T150000
SUMMARY:Bolder Boulder
DESCRIPTION:Annual 10-kilometer run in Boulder, Colorado
LOCATION:Folsom Field, University of Colorado (finish line)
URL:http://www.bolderboulder.com/
STATUS:confirmed
GEO:40.0095;105.2669
ATTENDEE;CN=Adam Gibbons:mailto:adam@example.com
ATTENDEE;CN=Brittany Seaton:mailto:brittany@example2.org
CATEGORIES:10k races,Memorial Day Weekend,Boulder CO
END:VEVENT
END:VCALENDAR

```

## API

### `buildEvent(attributes)`

Returns an iCal-compliant text string.

#### `attributes`

Optional. Object literal attributes of the event. Accepts the following properties:

| Property      | Description   | Default  |
| ------------- | ------------- | ----------
| start         | ISO 8601 date (`yyyymmdd`) or datetime (`yyyymmddThhmm`) string. | Today (as ISO 8601 date string)
| end           | Event end date/time string. Must match `start` ISO 8601 value type. | If `start` value is date, next day; if value is datetime, same value as `start`.
| title         | String. Title of event.
| description   | String. Description of event.
| location      | String. Intended venue, e.g. `Room 101`.
| geo           | Object literal. Geographic coordinates (lat/lon) as floats, e.g. `{lat: 38.9072, lon: 77.0369}`.
| url           | String. URL associated with event.
| status        | String. Must be one of: `tentative`, `confirmed`, or `cancelled`.
| attendees     | Array of object literals, e.g. `{name: 'Foo', email: 'foo@example.com'}`.
| categories    | Array of string values.

### `createEvent(attributes[, options], cb)`

#### `options`
Optional. Object literal accepting the following properties:
| Property      | Description   | Default  |
| ------------- | ------------- | ----------
| filepath      | Filename, relative path + filename, or absolute path + filename. | Absolute path to current working directory, plus `event.ics`. E.g. `/Users/gibber/my-project/event.ics`

`filepath` accepts relative or absolute paths. For example, these
values resolve to `/Users/gibber/my-event.ics` when executed from `/Users/gibber`:

- `my-event` 
- `my-event.ics`
- `/Users/gibber/my-event`
- `/Users/gibber/my-event.ics`

...and these will resolve to `/Users/my-event.ics` when executed from `/Users/gibber`:

- `../my-event`
- `../my-event.ics`

## References

- [RFC 5545: Internet Calendaring and Scheduling Core Object Specification (iCalendar)](http://tools.ietf.org/html/rfc5545)
- [iCalendar Validator](http://icalendar.org/validator.html#results)