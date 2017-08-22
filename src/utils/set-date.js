import {
  setDateWithLocalTime,
  setDateWithUTCtime
} from './index'

export default function setDate(args, type) {
  if (!type) {
    return setDateWithUTCtime(args)
  }

  if (type === 'local') {
    return setDateWithLocalTime(args)
  }
}
