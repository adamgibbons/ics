import { expect } from 'chai'
import { setContact } from '../../src/utils'

describe('utils.setContact', () => {
  it('sets a contact and defaults RSVP to false', () => {
    const contact1 = {
      name: 'Adam Gibbons',
      email: 'adam@example.com'
    }

    const contact2 = {
      name: 'Adam Gibbons',
      email: 'adam@example.com',
      rsvp: true,
      dir: 'https://example.com/contacts/adam'
    }

    expect(setContact(contact1))
    .to.equal('RSVP=FALSE;CN=Adam Gibbons:mailto:adam@example.com')

    expect(setContact(contact2))
    .to.equal('RSVP=TRUE;DIR=https://example.com/contacts/adam;CN=Adam Gibbons:mailto:adam@example.com')
  })
})
