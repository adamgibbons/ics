export interface IDurationProp {
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

export function printDuration ( duration: IDurationProp ) {
    const { weeks, days, hours, minutes, seconds } = duration
  
    let formattedDuration = 'P'
    formattedDuration += weeks ? `${weeks}W` : ''
    formattedDuration += days ? `${days}D` : ''
    formattedDuration += 'T'
    formattedDuration += hours ? `${hours}H` : ''
    formattedDuration += minutes ? `${minutes}M` : ''
    formattedDuration += seconds ? `${seconds}S` : ''
  
    return formattedDuration
  }
