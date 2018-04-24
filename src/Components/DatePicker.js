import React from 'react';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { css } from 'emotion';

const datePickerClass = css`
  flex: 1;
  height: 50px;
`;

export default ({input, placeholder}) => {
  return(
    <DatePicker
      dateFormat="YYYY/MM/DD"
      showTimeSelect={false}
      className={datePickerClass}
      selected={typeof input.value === 'object' ? input.value : undefined}
      onChange={(value) => input.onChange(value)}
      minDate={moment()}
      maxDate={moment().add(1, "year")}
      placeholderText={placeholder}
    />
  ) 
}
