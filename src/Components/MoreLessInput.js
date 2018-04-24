import React, { Component } from 'react'

export default class MoreLessInput extends Component {
  handleButton = (e, value) => {
    e.preventDefault()
    const {input} = this.props
    input.onChange(`${parseInt(input.value || 0) + value}`)
  }
  render() {
    const {input} = this.props
    return (
      <div>
        <button onClick={(e) => this.handleButton(e, -1)}>-</button>
        {input.value || 0}
        <button onClick={(e) => this.handleButton(e, 1)}>+</button>
      </div>
    )
  }
}
