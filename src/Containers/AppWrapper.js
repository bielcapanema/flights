import React, { Component } from 'react'
import styled from 'react-emotion'

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url("paper.gif");
`

export default class componentName extends Component {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    )
  }
}
