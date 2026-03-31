import { describe, expect, it } from "vitest";
import { createRecurrenceRule, CreateRecurrenceRuleParams, printRecurrenceRule, RecurrenceRuleWeekdays } from "./recurrenceRule.prop";
import { CreateDateTimeParams, DateTimeList } from "./dateTime.prop";

// The value of the UNTIL rule part MUST have the same
// value type as the "DTSTART" property.


describe("Creates and prints recurrence rules for the following cases:", () => {
  // Daily for 10 occurrences:
  // DTSTART;TZID=America/New_York:19970902T090000
  // RRULE:FREQ=DAILY;COUNT=10
  // ==> (1997 9:00 AM EDT) September 2-11
  it("Daily for 10 occurrences:", () => {
    const recurrenceRuleParams = {
      frequency: "DAILY",
      count: 10
    } satisfies CreateRecurrenceRuleParams;

    const expected = "RRULE:FREQ=DAILY;COUNT=10\r\n"

    const recurrenceRule = createRecurrenceRule(recurrenceRuleParams)
    const result = printRecurrenceRule(recurrenceRule)
    expect(result).toBe(expected)
  })

  it("Daily until December 24, 1997", () => {
    // Daily until December 24, 1997:

    // DTSTART;TZID=America/New_York:19970902T090000
    // RRULE:FREQ=DAILY;UNTIL=19971224T000000Z

    // ==> (1997 9:00 AM EDT) September 2-30;October 1-25
    //     (1997 9:00 AM EST) October 26-31;November 1-30;December 1-23

    const dtstartParams = {
      value: [1997, 9, 2, 9],
      tzid: "America/New_York"
    } as CreateDateTimeParams;

    const recurrenceRuleParams = {
      frequency: "DAILY",
      until: {
        value: [1997, 12, 24] as DateTimeList
      }
    } satisfies CreateRecurrenceRuleParams;

    const expected = "RRULE:FREQ=DAILY;UNTIL=19971224T000000Z\r\n"

    const recurrenceRule = createRecurrenceRule(recurrenceRuleParams, dtstartParams)
    const result = printRecurrenceRule(recurrenceRule)
    expect(result).toBe(expected)
  })

  it("Every 10 days, 5 occurrences", () => {
    // Every 10 days, 5 occurrences:
    // DTSTART;TZID=America/New_York:19970902T090000
    // RRULE:FREQ=DAILY;INTERVAL=10;COUNT=5

    // ==> (1997 9:00 AM EDT) September 2,12,22;
    //                        October 2,12

    const dtstartParams = {
      value: [1997, 9, 2, 9],
      tzid: "America/New_York"
    } satisfies CreateDateTimeParams;

    const recurrenceRuleParams = {
      frequency: "DAILY",
      interval: 10,
      count: 5
    } satisfies CreateRecurrenceRuleParams;

    const expected = "RRULE:FREQ=DAILY;INTERVAL=10;COUNT=5\r\n"

    const recurrenceRule = createRecurrenceRule(recurrenceRuleParams, dtstartParams)
    const result = printRecurrenceRule(recurrenceRule)
    expect(result).toBe(expected)
  })

  it("Every day in January, for 3 years", () => {
    // DTSTART;TZID=America/New_York:19980101T090000

    // RRULE:FREQ=YEARLY;UNTIL=20000131T140000Z;
    //  BYMONTH=1;BYDAY=SU,MO,TU,WE,TH,FR,SA
    // or
    // RRULE:FREQ=DAILY;UNTIL=20000131T140000Z;BYMONTH=1

    // ==> (1998 9:00 AM EST)January 1-31
    //     (1999 9:00 AM EST)January 1-31
    //     (2000 9:00 AM EST)January 1-31

    const dtstartParams = {
      value: [1998, 1, 1, 9],
      tzid: "America/New_York"
    } satisfies CreateDateTimeParams;

    const recurrenceRuleParams = {
      frequency: "YEARLY",
      until: {
        value: [2000, 1, 31, 14]
      },
      bymonth: [1],
      byday: ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as RecurrenceRuleWeekdays[]
    } satisfies CreateRecurrenceRuleParams;

    const expected = "RRULE:FREQ=YEARLY;UNTIL=20000131T140000Z;BYMONTH=1;BYDAY=SU,MO,TU,WE,TH,FR,SA\r\n"

    const recurrenceRule = createRecurrenceRule(recurrenceRuleParams, dtstartParams)
    const result = printRecurrenceRule(recurrenceRule)
    expect(result).toBe(expected)
  })

  it("Weekly until December 24, 1997", () => {
    // DTSTART;TZID=America/New_York:19970902T090000
    // RRULE:FREQ=WEEKLY;UNTIL=19971224T000000Z

    // ==> (1997 9:00 AM EDT) September 2,9,16,23,30;
    //                        October 7,14,21
    //     (1997 9:00 AM EST) October 28;
    //                        November 4,11,18,25;
    //                        December 2,9,16,23

    const dtstartParams = {
      value: [1997, 9, 2, 9],
      tzid: "America/New_York"
    } satisfies CreateDateTimeParams;

    const recurrenceRuleParams = {
      frequency: "WEEKLY",
      until: {
        value: [1997, 12, 24]
      }
    } satisfies CreateRecurrenceRuleParams;

    const expected = "RRULE:FREQ=WEEKLY;UNTIL=19971224T000000Z\r\n"

    const recurrenceRule = createRecurrenceRule(recurrenceRuleParams, dtstartParams)
    const result = printRecurrenceRule(recurrenceRule)
    expect(result).toBe(expected)

  })

  it("Every other week - forever:", () => {

    // DTSTART;TZID=America/New_York:19970902T090000
    // RRULE:FREQ=WEEKLY;INTERVAL=2;WKST=SU

    const dtstartParams = {
      value: [1997, 9, 2, 9],
      tzid: "America/New_York"
    } satisfies CreateDateTimeParams;

    const recurrenceRuleParams = {
      frequency: "WEEKLY",
      interval: 2,
      weekStart: "SU",
    } satisfies CreateRecurrenceRuleParams;

    const expected = "RRULE:FREQ=WEEKLY;INTERVAL=2;WKST=SU\r\n"

    const recurrenceRule = createRecurrenceRule(recurrenceRuleParams, dtstartParams)
    const result = printRecurrenceRule(recurrenceRule)
    expect(result).toBe(expected)

  })

  it("Weekly on Tuesday and Thursday for five weeks:", () => {
    // RRULE:FREQ=WEEKLY;COUNT=10;WKST=SU;BYDAY=TU,TH
    const recurrenceRuleParams = {
      frequency: "WEEKLY",
      count: 10,
      weekStart: "SU",
      byday: ["TU", "TH"] as RecurrenceRuleWeekdays[]
    } satisfies CreateRecurrenceRuleParams;

    const expected = "RRULE:FREQ=WEEKLY;COUNT=10;WKST=SU;BYDAY=TU,TH\r\n"

    const recurrenceRule = createRecurrenceRule(recurrenceRuleParams)
    const result = printRecurrenceRule(recurrenceRule)
    expect(result).toBe(expected)
  })



  it.skip("Every other week on Monday, Wednesday, and Friday until December 24, 1997, starting on Monday, September 1, 1997:", () => {
    // Monthly on the first Friday for 10 occurrences:

    // DTSTART;TZID=America/New_York:19970905T090000
    // RRULE:FREQ=MONTHLY;COUNT=10;BYDAY=1FR

    // ==> (1997 9:00 AM EDT) September 5;October 3
    //     (1997 9:00 AM EST) November 7;December 5
    //     (1998 9:00 AM EST) January 2;February 6;March 6;April 3
    //     (1998 9:00 AM EDT) May 1;June 5
  })

  it.skip("Monthly on the first Friday until December 24, 1997:", () => {
    // Monthly on the first Friday until December 24, 1997:

    // DTSTART;TZID=America/New_York:19970905T090000
    // RRULE:FREQ=MONTHLY;UNTIL=19971224T000000Z;BYDAY=1FR

    // ==> (1997 9:00 AM EDT) September 5; October 3
    //     (1997 9:00 AM EST) November 7; December 5
  })

  it.skip("Every other month on the first and last Sunday of the month for 10 occurrences:", () => {
    // Every other month on the first and last Sunday of the month for 10 occurrences:

    // DTSTART;TZID=America/New_York:19970907T090000
    // RRULE:FREQ=MONTHLY;INTERVAL=2;COUNT=10;BYDAY=1SU,-1SU

    // ==> (1997 9:00 AM EDT) September 7,28
    //     (1997 9:00 AM EST) November 2,30
    //     (1998 9:00 AM EST) January 4,25;March 1,29
    //     (1998 9:00 AM EDT) May 3,31
  })

  it.skip("Monthly on the second-to-last Monday of the month for 6 months:", () => {
    // Monthly on the second-to-last Monday of the month for 6 months:

    // DTSTART;TZID=America/New_York:19970922T090000
    // RRULE:FREQ=MONTHLY;COUNT=6;BYDAY=-2MO

    // ==> (1997 9:00 AM EDT) September 22;October 20
    //     (1997 9:00 AM EST) November 17;December 22
    //     (1998 9:00 AM EST) January 19;February 16
  })

  it.skip("Monthly on the third-to-the-last day of the month, forever:", () => {
    // Monthly on the third-to-the-last day of the month, forever:

    // DTSTART;TZID=America/New_York:19970928T090000
    // RRULE:FREQ=MONTHLY;BYMONTHDAY=-3

    // ==> (1997 9:00 AM EDT) September 28
    //     (1997 9:00 AM EST) October 29;November 28;December 29
    //     (1998 9:00 AM EST) January 29;February 26
  })

  it.skip("Monthly on the 2nd and 15th of the month for 10 occurrences:", () => {
    // Monthly on the 2nd and 15th of the month for 10 occurrences:

    // DTSTART;TZID=America/New_York:19970902T090000
    // RRULE:FREQ=MONTHLY;COUNT=10;BYMONTHDAY=2,15

    // ==> (1997 9:00 AM EDT) September 2,15;October 2,15
    //     (1997 9:00 AM EST) November 2,15;December 2,15
    //     (1998 9:00 AM EST) January 2,15
  })

  it.skip("Monthly on the first and last day of the month for 10 occurrences:", () => {
    // Monthly on the first and last day of the month for 10 occurrences:

    // DTSTART;TZID=America/New_York:19970902T090000
    // RRULE:FREQ=MONTHLY;COUNT=10;BYMONTHDAY=1,-1

    // ==> (1997 9:00 AM EDT) September 30;October 1
    //     (1997 9:00 AM EST) October 31;November 1,30;December 1,31
    //     (1998 9:00 AM EST) January 1,31;February 1
  })

  it.skip("Every 18 months on the 10th thru 15th of the month for 10 occurrences:", () => {
    // Every 18 months on the 10th thru 15th of the month for 10 occurrences:

    // DTSTART;TZID=America/New_York:19970910T090000
    // RRULE:FREQ=MONTHLY;INTERVAL=18;COUNT=10;BYMONTHDAY=10,11,12,13,14,15

    // ==> (1997 9:00 AM EDT) September 10,11,12,13,14,15
    //     (1999 9:00 AM EST) March 10,11,12,13,14,15
  })

  it.skip("Every Tuesday, every other month:", () => {
    // Every Tuesday, every other month:

    // DTSTART;TZID=America/New_York:19970902T090000
    // RRULE:FREQ=MONTHLY;INTERVAL=2;BYDAY=TU

    // ==> (1997 9:00 AM EDT) September 2,9,16,23,30
    //     (1997 9:00 AM EST) November 4,11,18,25
    //     (1998 9:00 AM EST) January 6,13,20,27;March 3,10,17,24,31
  })
})