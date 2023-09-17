import { nanoid } from 'nanoid'

export const headerDefaults = () => ({
  productId: 'adamgibbons/ics',
  method: 'PUBLISH'
})

export const eventDefaults = () => ({
  title: 'Untitled event',
  uid: nanoid(),
  timestamp: Date.now()
})
