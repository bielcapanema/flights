import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { css } from 'emotion'

const selectClass = css`
  flex: 1;
`

export default class SelectInput extends React.Component {

  render() {
    const {input, options, handleSearch, placeholder, noResultsText} = this.props

    return (
      <Select
        noResultsText={noResultsText}
        placeholder={placeholder}
        className={selectClass}
        value={input.value}
        onInputChange={(input) => handleSearch(input)}
        onChange={(value) => {input.onChange(value)}}
        onBlur={() => input.onBlur(input.value)}
        options={options}
      />
    );
  } 
}