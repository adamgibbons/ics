import { expect } from 'chai'
import { formatAlarm } from '../../src/utils'

describe.only('utils.formatAlarm', () => {
  it('formats an alarm', () => {
    const attributes = {
      repeat: 5,
      description: 'Foo',
      action: 'audio',
      attach: 'ftp://example.com/pub/sounds/bell-01.aud',
      duration: {
        weeks: 1,
        days: 15,
        hours: 3,
        minutes: 4,
        seconds: 50
      },
      trigger: [1997, 2, 17, 6, 30],
      summary: 'Bar baz'
    }
    expect(formatAlarm).to.be.a('function')
    // console.log(formatAlarm())

    const alarm = formatAlarm(attributes)
    console.log('fooo')
    console.log(alarm)

    // const alarm = formatAlarm(attributes)

    expect(alarm).to.contain('BEGIN:VALARM')
    expect(alarm).to.contain('ACTION:audio')
    // expect(alarm).to.contain('ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud')
    // expect(alarm).to.contain('REPEAT:5')
    // expect(alarm).to.contain('DURATION:P1W15DT3H4M50S')
    // expect(alarm).to.contain('DESCRIPTION:Foo')
    // expect(alarm).to.contain('SUMMARY:Bar baz')
    // expect(alarm).to.contain('TRIGGER;VALUE=DATE-TIME:19970317T133000Z')
    expect(alarm).to.contain('END:VALARM')
  })
})

// BEGIN:VALARM
// TRIGGER;VALUE=DATE-TIME:19970317T133000Z
// REPEAT:4
// DURATION:PT15M
// ACTION:AUDIO
// ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/
//  sounds/bell-01.aud
// END:VALARM

// action: Joi.string().regex(/audio|display|email/).required(),
// trigger: Joi.string().required(),
// description: Joi.string(),
// duration: Joi.string(),
// repeat: Joi.string(),
// attach: Joi.any(),
// summary: Joi.string(),
// attendee: contactSchema,
// 'x-prop': Joi.any(),
// 'iana-prop': Joi.any()