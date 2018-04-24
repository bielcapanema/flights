import React from 'react';
import { render } from 'react-dom';
import moment from 'moment'
import styled from 'react-emotion'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { css } from 'emotion';

const datePickerClass = css`
  flex: 1;
  height: 50px;
`;

export default ({input, dafaultDate}) => {
  return(
    <DatePicker
      dateFormat="YYYY/MM/DD"
      showTimeSelect={false}
      className={datePickerClass}
      selected={typeof input.value === 'object' ? input.value : dafaultDate}
      onChange={(value) => input.onChange(value)}
      minDate={moment()}
      maxDate={moment().add(1, "year")}
      placeholderText="Select a date between today and 5 days in the future"
    />
  ) 
}
