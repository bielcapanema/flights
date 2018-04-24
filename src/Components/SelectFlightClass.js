import React, { Component } from 'react'
import {RadioGroup, RadioButton} from 'react-radio-buttons'

export default class SelectFlightClass extends Component {
  render() {
    const {input, options, handleSearch, placeholder, noResultsText} = this.props
    return (
      <RadioGroup value={input.value} onChange={ input.onChange } horizontal>
        <RadioButton value="EC">
          CLASSE ECONÔMICA
        </RadioButton>
        <RadioButton value="EX">
          CLASSE EXECUTIVA
        </RadioButton>
      </RadioGroup>
  )
  }
}
