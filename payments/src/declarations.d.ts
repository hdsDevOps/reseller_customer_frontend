declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.webp';


declare module 'react-date-range' {
  import { ComponentType } from 'react';

  export const DateRangePicker: ComponentType<any>;
  export const Calendar: ComponentType<any>;
}

declare module 'rsuite/lib/DateRangePicker' {
  import { DateRangePickerProps } from 'rsuite';
  export const DateRangePicker: React.FC<DateRangePickerProps>;
}

declare module 'rsuite' {
  import { DateRangePickerProps } from 'rsuite';
  export const DateRangePicker: React.FC<DateRangePickerProps>;
}
