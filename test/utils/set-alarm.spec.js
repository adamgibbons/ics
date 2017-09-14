import { expect } from 'chai'
import { setAlarm } from '../../src/utils'

describe('utils.setAlarm', () => {
  it('sets an alarm', () => {
    const attributes = {
      repeat: 5,
      description: 'Foo',
      action: 'audio',
      trigger: [1997, 1, 19, 2, 30],
      repeat: 4,
      attach: 'ftp://example.com/pub/sounds/bell-01.aud',
      description: 'foo bar!',
      duration: [1, 30],
      summary: 'fizz buzz'
    }

    expect(alarm).to.include({
      action: 'audio',
      repeat: 4,
      attach: 'ftp://example.com/pub/sounds/bell-01.aud',
      description: 'foo bar!',
      summary: 'fizz buzz'
    })
    expect(alarm.trigger).to.be.an('array')
      .that.has.ordered.members([1997, 1, 19, 2, 30])
    expect(alarm.duration).to.be.an('array')
      .that.has.ordered.members([1, 30])
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
