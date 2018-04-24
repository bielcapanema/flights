import React, { Component } from 'react';
import styled from 'react-emotion';
import Logo from '../Components/Logo';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
`;

export default class componentName extends Component {
  render() {
    return (
      <Container>
        <Logo />
        {this.props.children}
      </Container>
    )
  }
}
