import { CreateDateTimeParams, createDateTime, printDateTime } from "./dateTime.prop";
export type RecurrenceRuleFreqTypes = "SECONDLY" | "MINUTELY" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
export type RecurrenceRuleWeekdays = "SU" | "MO" | "TU" | "WE" | "TH" | "FR" | "SA";

// The value of the UNTIL rule part MUST have the same
// value type as the "DTSTART" property.  Furthermore, if the
// "DTSTART" property is specified as a date with local time, then
// the UNTIL rule part MUST also be specified as a date with local
// time.  If the "DTSTART" property is specified as a date with UTC
// time or a date with local time and time zone reference, then the
// UNTIL rule part MUST be specified as a date with UTC time.  In the
// case of the "STANDARD" and "DAYLIGHT" sub-components the UNTIL
// rule part MUST always be specified as a date with UTC time.  If
// specified as a DATE-TIME value, then it MUST be specified in a UTC
// time format.  If not present, and the COUNT rule part is also not
// present, the "RRULE" is considered to repeat forever.

export type CreateRecurrenceRuleParams = {
    frequency: RecurrenceRuleFreqTypes;
    interval?: number;
    count?: number;
    until?: CreateDateTimeParams;
    bysecond?: number[];
    byminute?: number[];
    byhour?: number[];
    byday?: RecurrenceRuleWeekdays[];
    bymonth?: number[];
    bymonthday?: number[];
    byyearday?: number[];
    byweekno?: number[];
    bysetpos?: number;
    weekStart?: RecurrenceRuleWeekdays;
}

export function createRecurrenceRule(recurrenceRuleParams: CreateRecurrenceRuleParams, dtstartParams?: CreateDateTimeParams) {
    if (recurrenceRuleParams.until?.type && dtstartParams) {
        const dtstart = createDateTime(dtstartParams);
        if (dtstart.type === "local") {
            recurrenceRuleParams.until.type = "local";
        } else {
            recurrenceRuleParams.until.type = "utc";
        }
    }
    return recurrenceRuleParams;
}

export function printRecurrenceRule(recurrenceRule: CreateRecurrenceRuleParams) {
    let formattedResponse = "RRULE";

    formattedResponse += `:FREQ=${recurrenceRule.frequency}`;

    if (recurrenceRule.until) {
        formattedResponse += `;UNTIL=${printDateTime(recurrenceRule.until)}`;
    }

    if (recurrenceRule.interval) {
        formattedResponse += `;INTERVAL=${recurrenceRule.interval}`;
    }

    if (recurrenceRule.count) {
        formattedResponse += `;COUNT=${recurrenceRule.count}`;
    }

    if (recurrenceRule.weekStart) {
        formattedResponse += `;WKST=${recurrenceRule.weekStart}`;
    }

    if (recurrenceRule.bymonth?.length) {
        formattedResponse += `;BYMONTH=${recurrenceRule.bymonth.join(",")}`;
    }

    if (recurrenceRule.bysecond?.length) {
        formattedResponse += `;BYSECOND=${recurrenceRule.bysecond.join(",")}`;
    }

    if (recurrenceRule.byminute?.length) {
        formattedResponse += `;BYMINUTE=${recurrenceRule.byminute.join(",")}`;
    }

    if (recurrenceRule.byhour?.length) {
        formattedResponse += `;BYHOUR=${recurrenceRule.byhour.join(",")}`;
    }

    if (recurrenceRule.byday?.length) {
        formattedResponse += `;BYDAY=${recurrenceRule.byday.join(",")}`;
    }

    if (recurrenceRule.bymonthday?.length) {
        formattedResponse += `;BYMONTHDAY=${recurrenceRule.bymonthday.join(",")}`;
    }

    if (recurrenceRule.byyearday?.length) {
        formattedResponse += `;BYYEARDAY=${recurrenceRule.byyearday.join(",")}`;
    }

    if (recurrenceRule.byweekno?.length) {
        formattedResponse += `;BYWEEKNO=${recurrenceRule.byweekno.join(",")}`;
    }

    if (recurrenceRule.bysetpos) {
        formattedResponse += `;BYSETPOS=${recurrenceRule.bysetpos}`;
    }

    formattedResponse += "\r\n";
    return formattedResponse;
}
// recur-rule-part = ( "FREQ" "=" freq )
// / ( "UNTIL" "=" enddate )
// / ( "COUNT" "=" 1*DIGIT )
// / ( "INTERVAL" "=" 1*DIGIT )
// / ( "BYSECOND" "=" byseclist )
// / ( "BYMINUTE" "=" byminlist )
// / ( "BYHOUR" "=" byhrlist )
// / ( "BYDAY" "=" bywdaylist )
// / ( "BYMONTHDAY" "=" bymodaylist )
// / ( "BYYEARDAY" "=" byyrdaylist )
// / ( "BYWEEKNO" "=" bywknolist )
// / ( "BYMONTH" "=" bymolist )
// / ( "BYSETPOS" "=" bysplist )
// / ( "WKST" "=" weekday )