import { expect } from 'chai'
import { createEvent } from '../src'

describe('duration serialization', () => {
  const cases = [
    ['days only', { days: 1 }, 'P1D'],
    ['weeks only', { weeks: 2 }, 'P2W'],
    ['days with zero time fields', { days: 2, hours: 0, minutes: 0, seconds: 0 }, 'P2D'],
    ['time only', { hours: 1, minutes: 15, seconds: 30 }, 'PT1H15M30S'],
    ['days and time', { days: 1, hours: 2, minutes: 30 }, 'P1DT2H30M']
  ]

  for (const [name, duration, expected] of cases) {
    it(`writes an event duration with ${name}`, () => {
      const { error, value } = createEvent({
        start: duration.hours ? [2026, 9, 22, 12, 0] : [2026, 9, 22],
        duration
      })

      expect(error).to.be.null
      expect(value.split('\r\n')).to.include(`DURATION:${expected}`)
    })

    it(`writes an alarm repeat duration with ${name}`, () => {
      const { error, value } = createEvent({
        start: [2026, 9, 22, 12, 0],
        alarms: [{ action: 'display', description: 'Reminder', trigger: { minutes: 15 }, repeat: 1, duration }]
      })

      expect(error).to.be.null
      expect(value.split('\r\n')).to.include(`DURATION:${expected}`)
    })

    for (const before of [true, false]) {
      it(`writes an alarm ${before ? 'before' : 'after'} the event with ${name}`, () => {
        const { error, value } = createEvent({
          start: [2026, 9, 22, 12, 0],
          alarms: [{ action: 'display', description: 'Reminder', trigger: { ...duration, before } }]
        })

        expect(error).to.be.null
        expect(value.split('\r\n')).to.include(`TRIGGER:${before ? '-' : ''}${expected}`)
      })
    }
  }

  for (const trigger of [{ seconds: 0 }, { hours: 0, minutes: 0, seconds: 0 }, {}]) {
    it(`writes a zero alarm offset for ${JSON.stringify(trigger)}`, () => {
      const { error, value } = createEvent({
        start: [2026, 9, 22, 12, 0],
        alarms: [{ action: 'display', description: 'Reminder', trigger }]
      })

      expect(error).to.be.null
      expect(value.split('\r\n')).to.include('TRIGGER:PT0S')
    })
  }
})
