ics
==================

The [iCalendar](http://tools.ietf.org/html/rfc5545) generator

[![npm version](https://badge.fury.io/js/ics.svg)](http://badge.fury.io/js/ics)
[![Code Climate](https://codeclimate.com/github/adamgibbons/ics/badges/gpa.svg)](https://codeclimate.com/github/adamgibbons/ics)
[![TravisCI build status](https://travis-ci.org/adamgibbons/ics.svg?branch=master)](https://travis-ci.org/adamgibbons/ics.svg?branch=master)
[![Downloads](https://img.shields.io/npm/dm/ics.svg)](http://npm-stat.com/charts.html?package=ics)

## Install

`npm install -S ics`

## Example Usage

1. Create an iCalendar event:

```javascript
import ics from 'ics'

const event = {
  start: [2018, 5, 30, 6, 30],
  duration: [{ hours: 6, minutes: 30 }],
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
  location: 'Folsom Field, University of Colorado (finish line)',
  url: 'http://www.bolderboulder.com/',
  geo: { lat: 40.0095, lon: 105.2669 },
  categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
  status: 'CONFIRMED',
  organizer: [{ name: 'Admin', email: 'Race@BolderBOULDER.com' }],
  attendees: [
    { name: 'Adam Gibbons', email: 'adam@example.com' },
    { name: 'Brittany Seaton', email: 'brittany@example2.org' }
  ]
}

ics.createEvent(event, (error, value) => {
  if (err) {
    console.log(err)
  }

  console.log(value)
  //  BEGIN:VCALENDAR
  //  VERSION:2.0
  //  CALSCALE:GREGORIAN
  //  PRODID:adamgibbons/ics
  //  BEGIN:VEVENT
  //  UID:070bbdd0-a6de-11e7-9552-4faa901a846b
  //  SUMMARY:Bolder Boulder
  //  DTSTAMP:20171002T012300Z
  //  DTSTART:20180530T125000Z
  //  DESCRIPTION:Annual 10-kilometer run in Boulder, Colorado
  //  URL:http://www.bolderboulder.com/
  //  GEO:40.0095;105.2669
  //  LOCATION:Folsom Field, University of Colorado (finish line)
  //  STATUS:CONFIRMED
  //  CATEGORIES:10k races,Memorial Day Weekend,Boulder CO
  //  ATTENDEE;CN=Adam Gibbons:mailto:adam@example.com
  //  ATTENDEE;CN=Brittany Seaton:mailto:brittany@example2.org
  //  BEGIN:VALARM
  //  ACTION:display
  //  DESCRIPTION:Reminder
  //  TRIGGER;VALUE=DATE-TIME:20180530T020000Z
  //  END:VALARM
  //  DURATION:PT5H
  //  END:VEVENT
  //  END:VCALENDAR


})
```

2. Write an iCalendar file:
```javascript
import { writeFileSync } from 'fs'
import ics from 'ics'

ics.createEvent({
  title: 'Dinner',
  description: 'Nightly thing I do',
  start: [2018, 1, 15, 6, 30],
  duration: { minutes: 50 }
}, (error, value) => {
  if (error) {
    console.log(error)
  }

  fs.writeFileSync(`${__dirname}/event.ics`, value)
})
```

## API

### `createEvent(attributes, [callback])`

Returns an iCal-compliant text string.
If callback is provided, returns a Node-style callback.
If callback is not provided, returns an object with error and value properties.

#### `attributes`

Object literal containing event information.
Only the `start` property is required.
The following properties are accepted:

| Property      | Description   | Example  |
| ------------- | ------------- | ----------
| start         | **Required**. Date and time at which the event begins. | `[2000, 1, 5, 10, 0]` (January 5, 2000 in my timezone)
| end           | Time at which event ends. *Either* `end` or `duration` is required, but *not* both. | `[2000, 1, 5, 13, 5]` (January 5, 2000 at 1pm)
| duration      | How long the event lasts. Object literal having form `{ weeks, days, hours, minutes, seconds }` *Either* `end` or `duration` is required, but *not* both. | `{ hours: 1, minutes: 45 }` (1 hour and 45 minutes)
| title         | Title of event. | `'Code review'`
| description   | Description of event. | `'A constructive roasting of those seeking to merge into master branch'`
| location      | Intended venue | `Mountain Sun Pub and Brewery`.
| geo   | Geographic coordinates (lat/lon) | `{ lat: 38.9072, lon: 77.0369 }`
| url           | URL associated with event | `'http://www.mountainsunpub.com/'`
| status        | Three statuses are allowed: `TENTATIVE, `CONFIRMED`, or `CANCELLED` | `CONFIRMED`
| organizer     | Person organizing the event | `{name: 'Adam Gibbons', email: 'adam@example.com'}`
| attendees     | Persons invited to the event | `[{ name: 'Mo', email: 'mo@foo.com'}, { name: 'Bo', email: 'bo@bar.biz' }]`
| categories    | Categories associated with the event | `['hacknight', 'stout month']`
| alarms        | Alerts that can be set to trigger before, during, or after the event | `{ action: 'DISPLAY', trigger: [2000, 1, 4, 18, 30] }`

#### `callback`

Optional. 
Node-style callback. 

```javascript
function (err, value) {
  if (err) {
    // if iCal generation fails, err is an object containing the reason
    // if iCal generation succeeds, err is null
  }

  console.log(value) // iCal-compliant text string
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
