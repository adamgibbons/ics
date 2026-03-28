import { nanoid } from "nanoid"
import { printDuration, DurationComponentProps } from "../properties/duration.prop"

export interface IAlarmComponent {
    uid?: string;
    description: string;
    action: "AUDIO" | "DISPLAY" | "EMAIL";
    repeatCount: number;
    trigger?: DurationComponentProps;
    attach?: string;
    // duration?: IDurationProp;
}

export function createAlarm(alarm: IAlarmComponent) {
    alarm.uid = alarm.uid || nanoid(25)
    alarm.repeatCount = alarm.repeatCount || 0
    alarm.description = alarm.description || "Reminder"

    return alarm
}

export function printAlarm(alarm: IAlarmComponent) {
    let formattedResponse = 'BEGIN:VALARM\r\n'

    formattedResponse += `ACTION:${alarm.action}\r\n`

    if (alarm.trigger) {
        formattedResponse += `TRIGGER:${printDuration(alarm.trigger)}\r\n`
    }

    formattedResponse += `REPEAT:${alarm.repeatCount}\r\n`

    if (alarm.attach) {
        formattedResponse += `ATTACH:${alarm.attach}\r\n`
    }
    // if (alarm.duration) {
    //     formattedResponse += `DURATION:${printDuration(alarm.duration)}\r\n`
    // }
    formattedResponse += 'END:VALARM\r\n'
    return formattedResponse
}
