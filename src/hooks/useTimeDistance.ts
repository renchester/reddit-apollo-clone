'use client';

import { isBefore, intervalToDuration, formatDuration } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import merge from 'lodash.merge';

interface FormatDurationType {
  format: string[];
  zero: boolean;
  delimiter: string;
  locale: Locale;
}

interface TimeDistanceProps {
  endDate: Date;
  onTimerEnd?: () => void;
  latestDate?: Date;
  formatDurationOptions?: Partial<FormatDurationType>;
}

const useTimeDistance = (props: TimeDistanceProps) => {
  const {
    endDate,
    onTimerEnd,
    latestDate: _latestDate,
    formatDurationOptions,
  } = props;

  const [latestDate, setLatesDate] = useState(_latestDate || new Date());
  const isEnded = isBefore(endDate, latestDate);

  const formatDistanceLocale = {
    lessThanXSeconds: '<1m',
    xSeconds: '<1m',
    halfAMinute: '<1m',
    lessThanXMinutes: '{{count}}m',
    xMinutes: '{{count}}m',
    aboutXHours: '{{count}}h',
    xHours: '{{count}}h',
    xDays: '{{count}}d',
    aboutXWeeks: '{{count}}w',
    xWeeks: '{{count}}w',
    aboutXMonths: '{{count}}m',
    xMonths: '{{count}}m',
    aboutXYears: '{{count}}y',
    xYears: '{{count}}y',
    overXYears: '{{count}}y',
    almostXYears: '{{count}}y',
  };

  const formatDistanceShortenLocale = (
    token: keyof typeof formatDistanceLocale,
    count: string,
  ) => {
    return formatDistanceLocale[token].replace('{{count}}', count);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      if (isEnded) {
        clearInterval(interval);
        onTimerEnd && onTimerEnd();
        return;
      }
      setLatesDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isEnded, onTimerEnd]);

  const duration = useMemo(() => {
    return intervalToDuration({ start: latestDate, end: endDate });
  }, [latestDate, endDate]);

  const defaultFormatDurationOptions = {
    format: ['years', 'days', 'hours', 'minutes'],
    locale: {
      formatDistance: formatDistanceShortenLocale,
    },
  };

  const mergedFormatDurationOptions = merge(
    defaultFormatDurationOptions,
    formatDurationOptions,
  );

  const formattedDuration = formatDuration(
    duration,
    mergedFormatDurationOptions,
  );

  const formattedDurationShortened = formattedDuration.split(' ')[0];

  return formattedDurationShortened;
};

export default useTimeDistance;
