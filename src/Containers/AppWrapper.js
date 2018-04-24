import React, { Component } from 'react';
import styled from 'react-emotion';
import Logo from '../Components/Logo';
import ReduxToastr from 'react-redux-toastr'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  font-family: Montserrat,sans-serif;
`;

export default class componentName extends Component {
  render() {
    return (
      <Container>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar/>
        <Logo />
        {this.props.children}
      </Container>
    )
  }
}
