import { expect } from 'chai'
import { setContact } from '../../src/utils'

describe('utils.setContact', () => {
  it('set a contact with role', () => {
    const contact = { name: 'm-vinc', email: 'vinc@example.com' }
    const contactChair = Object.assign({role: 'CHAIR'}, contact)
    const contactRequired = Object.assign({role: 'REQ-PARTICIPANT' }, contact)
    const contactOptional = Object.assign({role: 'OPT-PARTICIPANT' }, contact)
    const contactNon = Object.assign({role: 'NON-PARTICIPANT' }, contact)
    expect(setContact(contactChair))
    .to.equal(`RSVP=FALSE;ROLE=CHAIR;CN=m-vinc:mailto:vinc@example.com`)
    expect(setContact(contactRequired))
    .to.equal(`RSVP=FALSE;ROLE=REQ-PARTICIPANT;CN=m-vinc:mailto:vinc@example.com`)
    expect(setContact(contactOptional))
    .to.equal(`RSVP=FALSE;ROLE=OPT-PARTICIPANT;CN=m-vinc:mailto:vinc@example.com`)
    expect(setContact(contactNon))
    .to.equal(`RSVP=FALSE;ROLE=NON-PARTICIPANT;CN=m-vinc:mailto:vinc@example.com`)
    expect(setContact(contact))
    .to.equal(`RSVP=FALSE;CN=m-vinc:mailto:vinc@example.com`)
  })
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
    .to.equal('RSVP=FALSE;PARTSTAT=NEEDS-ACTION;CN=m-vinc:mailto:vinc@example.com')

    expect(setContact(contactDeclined))
    .to.equal('RSVP=FALSE;PARTSTAT=DECLINED;CN=m-vinc:mailto:vinc@example.com')

    expect(setContact(contactTentative))
    .to.equal('RSVP=FALSE;PARTSTAT=TENTATIVE;CN=m-vinc:mailto:vinc@example.com')

    expect(setContact(contactAccepted))
    .to.equal('RSVP=FALSE;PARTSTAT=ACCEPTED;CN=m-vinc:mailto:vinc@example.com')
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
  it('set a contact with cutype and guests', () => {
    const contact = { name: 'm-vinc', email: 'vinc@example.com' }
    const contactCuGuests = Object.assign({ cutype: 'INDIVIDUAL', xNumGuests: 0 }, contact)
    const contactString = setContact(contactCuGuests)

    expect(contactString).to.contain('CUTYPE=INDIVIDUAL')
    expect(contactString).to.contain('X-NUM-GUESTS=0')
  })
})
