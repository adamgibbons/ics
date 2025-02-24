export interface DateTimeComponentProp {
    value: string;
    tzid?: string;
}

export function formatDateTime(d: Date) {
    return d.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
}
