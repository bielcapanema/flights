import React, { Component } from 'react'
import styled from 'react-emotion';

const Button = styled('button')`
  background-color: transparent;
  border: 2px solid #1abc9c;
  border-radius: 100%;
  padding: 0;
  width: 20px;
  height: 20px;
  color: #1abc9c;
  outline:0;
  margin: 0 4px;
`

export default class MoreLessInput extends Component {
  handleButton = (e, value) => {
    e.preventDefault()
    const {input} = this.props
    if(input.value < this.props.maxValue || !(input.value == 0 && value == -1)) {
      input.onChange(`${parseInt(input.value || 0) + value}`)
    }
  }
  render() {
    const {input} = this.props
    return (
      <div>
        <Button onClick={(e) => this.handleButton(e, -1)}><i className="icon-reduction"></i></Button>
        {input.value || 0}
        <Button onClick={(e) => this.handleButton(e, 1)}><i className="icon-addition"></i></Button>
      </div>
    )
  }
}
