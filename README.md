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
import ics from 'ics'

ics.createEvent({
  start: [2018, 4, 30, 6, 30], //  May 30, 2018 at 6:30am (footnote1)
  end: [2018, 4, 30, 15, 0], // May 30, 2018 at 3:00pm
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
  location: 'Folsom Field, University of Colorado (finish line)',
  url: 'http://www.bolderboulder.com/',
  status: 'confirmed',
  geo: {
    lat: 40.0095,
    lon: 105.2669
  },
  attendees: [
    { name: 'Adam Gibbons', email: 'adam@example.com' },
    { name: 'Brittany Seaton', email: 'brittany@example2.org' }
  ],
  categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO']
}, (error, result) => {

  console.log(result)

  //  BEGIN:VCALENDAR
  //  VERSION:2.0
  //  CALSCALE:GREGORIAN
  //  PRODID:-//Adam Gibbons//agibbons.com//ICS: iCalendar Generator
  //  BEGIN:VEVENT
  //  UID:2073c980-9545-11e6-99f9-791bff9883ed
  //  DTSTAMP:20161018T151121Z
  //  DTSTART:20160530T065000
  //  DTEND:20160530T150000
  //  SUMMARY:Bolder Boulder
  //  DESCRIPTION:Annual 10-kilometer run in Boulder, Colorado
  //  LOCATION:Folsom Field, University of Colorado (finish line)
  //  URL:http://www.bolderboulder.com/
  //  STATUS:confirmed
  //  GEO:40.0095;105.2669
  //  ATTENDEE;CN=Adam Gibbons:mailto:adam@example.com
  //  ATTENDEE;CN=Brittany Seaton:mailto:brittany@example2.org
  //  CATEGORIES:10k races,Memorial Day Weekend,Boulder CO
  //  BEGIN:VALARM
  //  ACTION:DISPLAY
  //  TRIGGER:-PT24H
  //  DESCRIPTION:Reminder
  //  REPEAT:1
  //  DURATION:PT15M
  //  END:VALARM
  //  BEGIN:VALARM
  //  ACTION:AUDIO
  //  TRIGGER:-PT30M
  //  END:VALARM
  //  END:VEVENT
  //  END:VCALENDAR
})
```

Create an iCalendar file:
```
import { writeFileSync } from 'fs'
import ics from 'ics'

ics.createEvent({
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
  start: [2018, 4, 30, 6, 30],
  end: [2018, 4, 30, 15, 0]
}, (error, result) => {
  if (error) {
    console.log(error)
  }

  fs.writeFileSync('my-event.ics', result)
})
```

## API

### `createEvent(attributes, cb)`

Returns an iCal-compliant text string.

#### `attributes`

Object literal containing event information.
Only the `start` property is required.
The following properties are accepted:

| Property      | Description   | Example  |
| ------------- | ------------- | ----------
| start         | **Required**. Date and time in your timezone at which the event begins. | `[2000, 0, 5, 10, 0]` (January 5, 2000 at 10am in your timezone)
| startType     | 
| end           | Time at which event ends. *Either* `end` or `duration` is required, but *not* both. | `[2000, 0, 5, 13, 5]` (January 5, 2000 at 1pm)
| duration      | How long the event lasts. Object literal having form `{ weeks, days, hours, minutes, seconds }` *Either* `end` or `duration` is required, but *not* both. | `{ hours: 1, minutes: 45 }` (1 hour and 45 minutes)
| title         | Title of event. | `'Code review'`
| description   | Description of event. | `'A constructive roasting of those seeking to merge into master branch'`
| location      | Intended venue | `Mountain Sun Pub and Brewery`.
| geolocation   | Geographic coordinates (lat/lon) | `{ lat: 38.9072, lon: 77.0369 }`
| url           | URL associated with event | `'http://www.mountainsunpub.com/'`
| status        | Three statuses are allowed: `tentative`, `confirmed`, or `cancelled` | `confirmed`
| organizer     | Person organizing the event | `{name: 'Adam Gibbons', email: 'adam@example.com'}`
| attendees     | Persons invited to the event | `[{ name: 'Mo', email: 'mo@foo.com'}, { name: 'Bo', email: 'bo@bar.biz' }]`
| categories    | Categories associated with the event | `['hacknight', 'stout month']`
| alarms        | Alerts that can be set to trigger before, during, or after the event | `{ action: 'DISPLAY', trigger: '-PT30M' }`

#### `cb`

Node-style callback that returns an error or formatted ical string

```
function(error, success) {
  if (error) { /* handle error */ }
}
```

## Develop

Run mocha tests and watch for changes:
```
npm start
```

Run tests once and exit:
```
npm test
```

Build the project, compiling all ES6 files within the `src` directory into vanilla JavaScript in the `dist` directory.
```
npm run build
```

## References

- [RFC 5545: Internet Calendaring and Scheduling Core Object Specification (iCalendar)](http://tools.ietf.org/html/rfc5545)
- [iCalendar Validator](http://icalendar.org/validator.html#results)
