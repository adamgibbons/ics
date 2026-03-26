export type DateTimeType = "local" | "utc" | "local-tzid";

type DateTimeList = [
    number, // year
    number, // month
    number, // day
    number, // hour
    number?, // minute
    number? // second
];

export interface CreateDateTimeParams {
    type?: DateTimeType;
    value: DateTimeList;
    tzid?: string | null;
}

export function createDateTime({ type = "utc", value, tzid = null }: CreateDateTimeParams) {
    const [year, month, day, hour = 12, minute = 0, second = 0] = value;

    if (type === "local") {
        return {
            type,
            value: new Date(year, month - 1, day, hour, minute, second),
            tzid: null
        }
    } else if (type === "local-tzid") {
        return {
            type,
            value: new Date(year, month - 1, day, hour, minute, second),
            tzid
        }
    } else {
        return {
            type,
            value: new Date(Date.UTC(year, month - 1, day, hour, minute, second)),
            tzid: null
        }
    }
}


export function printDateTime(dateTimeParams: CreateDateTimeParams) {
    const dateTime = createDateTime(dateTimeParams);
    const { type, value, tzid } = dateTime;

    const pad = (part: number) => String(part).padStart(2, "0");

    const year = type === "utc" ? value.getUTCFullYear() : value.getFullYear();
    const month = type === "utc" ? value.getUTCMonth() + 1 : value.getMonth() + 1;
    const day = type === "utc" ? value.getUTCDate() : value.getDate();
    const hour = type === "utc" ? value.getUTCHours() : value.getHours();
    const minute = type === "utc" ? value.getUTCMinutes() : value.getMinutes();
    const second = type === "utc" ? value.getUTCSeconds() : value.getSeconds();

    const formatted = `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}${pad(second)}`;

    if (type === "utc") return `${formatted}Z`;
    if (type === "local-tzid") return `TZID=${tzid}:${formatted}`;
    return formatted;
}
