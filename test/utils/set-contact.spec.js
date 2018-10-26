import { expect } from 'chai'
import { setContact } from '../../src/utils'

describe('utils.setContact', () => {
  it('set a contact with partstat', () => {
    const contact = { name: 'm-vinc', email: 'vinc@example.com' }
    const contactUndefined = Object.assign({partstat: undefined}, contact)
    const contactNeedsAction = Object.assign({partstat: 'NEEDS-ACTION'}, contact)
    const contactAccepted = Object.assign({partstat: 'ACCEPTED'}, contact)
    const contactDeclined = Object.assign({partstat: 'DECLINED'}, contact)
    const contactTentative = Object.assign({contact, partstat: 'TENTATIVE'}, contact)

    expect(setContact(contactUndefined))
    .to.equal('RSVP=FALSE;CN=m-vinc:mailto:vinc@example.com')

    expect(setContact(contactNeedsAction))
    .to.equal('PARTSTAT=NEEDS-ACTION;RSVP=FALSE;CN=m-vinc:mailto:vinc@example.com')

    expect(setContact(contactDeclined))
    .to.equal('PARTSTAT=DECLINED;RSVP=FALSE;CN=m-vinc:mailto:vinc@example.com')

    expect(setContact(contactTentative))
    .to.equal('PARTSTAT=TENTATIVE;RSVP=FALSE;CN=m-vinc:mailto:vinc@example.com')
    
    expect(setContact(contactAccepted))
    .to.equal('PARTSTAT=ACCEPTED;RSVP=FALSE;CN=m-vinc:mailto:vinc@example.com')
  })
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
