import { expect } from 'chai'
import { setAlarm } from '../../src/utils'

describe('utils.setAlarm', () => {
  it('sets an alarm', () => {
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
    const alarm = setAlarm(attributes)
    expect(alarm).to.equal([
      `BEGIN:VALARM`,
      `ACTION:AUDIO`,
      `REPEAT:5`,
      `DESCRIPTION:Foo`,
      `DURATION:P1W15DT3H4M50S`,
      `ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud`,
      `TRIGGER;VALUE=DATE-TIME:19970217T113000Z`,
      `SUMMARY:Bar baz`,
      `END:VALARM`,
      ``
    ].join('\r\n'))
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
