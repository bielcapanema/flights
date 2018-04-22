import React, { Component } from 'react'
import styled from 'react-emotion';

const Container = styled('div')`
  display: flex;
  flex: 1;
  padding: 8px;
  min-width: ${props => props.minWidth ? props.minWidth : '250px' };
`

const Button = styled('button')`
  flex: 1;
  height: 50px;
`

export default class ButtonComponent extends Component {
  render() {
    return (
      <Container>
        <Button>{this.props.children}</Button>
      </Container>
    )
  }
}
