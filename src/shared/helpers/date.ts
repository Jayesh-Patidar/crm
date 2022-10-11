import moment, { Moment } from 'moment';
import { DATE_TIME_FORMAT } from '../constants';

export const getFormattedDateAndTime = (
    date?: string | Date,
    format: string = DATE_TIME_FORMAT,
): string => {
    return moment(date).format(format);
};

interface GetDateDifference {
    isEqual: boolean;
    isEarly: boolean;
    isDelayed: boolean;
    duration: string;
}

export const getDateDifference = (
    startDate: string | Moment,
    endDate: string | Moment,
): GetDateDifference => {
    startDate = moment(startDate);
    endDate = moment(endDate);

    const isEqual = startDate.diff(endDate) === 0;
    const isEarly = startDate.diff(endDate) > 0;

    const days = startDate.diff(endDate, 'days');
    endDate.add(days, 'days');

    const hours = startDate.diff(endDate, 'hours');
    endDate.add(hours, 'hours');

    const minutes = startDate.diff(endDate, 'minutes');

    return {
        isEqual,
        isEarly,
        isDelayed: !isEarly && !isEarly,
        duration: [
            Math.abs(days),
            Math.abs(days) ? (Math.abs(days) === 1 ? 'day' : 'days') : '',
            Math.abs(hours),
            Math.abs(hours) ? (Math.abs(hours) === 1 ? 'hour' : 'hours') : '',
            Math.abs(minutes),
            Math.abs(minutes)
                ? Math.abs(minutes) === 1
                    ? 'minute'
                    : 'minutes'
                : '',
        ]
            .filter((item) => item)
            .join(' '),
    };
};
