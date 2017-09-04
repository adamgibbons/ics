import { expect } from 'chai'
import { setAlarm } from '../../src/utils'

describe('utils.setAlarm', () => {
  it('sets an audio alarm', () => {
    const alarm = setAlarm({
      action: 'audio',
      trigger: [1997, 1, 19, 2, 30],
      repeat: 4,
      attach: 'ftp://example.com/pub/sounds/bell-01.aud',
      description: 'foo bar!',
      duration: [1, 30],
      summary: 'fizz buzz'
    })

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
