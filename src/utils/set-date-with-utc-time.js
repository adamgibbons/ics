import moment from 'moment'

export default function setDateWithUTCtime(args) {
  if (args) {
    const [year, month, day, hour, minute ] = args
    const formattedDate = moment(args).utc().format('YYYYMMDDTHHmm00') + 'Z'
    return formattedDate    
  }

  return moment().utc().format('YYYYMMDDTHHmm00') + 'Z'
}
