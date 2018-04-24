import React, { Component } from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
  display: flex;
  flex: 1;
  padding: 8px;
  min-width: ${props => props.minWidth ? props.minWidth : '250px' };
`

// Class of maxmilhas website
const Button = styled('button')`
  border: none;
  background-color: #1abc9c;
  box-shadow: 0 3px 0 #15987e;
  flex: 1;
  height: 50px;
  margin-bottom: 10px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  text-transform: none;
  white-space: nowrap;
  font-family: Montserrat,sans-serif;
  font-weight: 700;
  width: 100%;
  font-size: 14px;
  padding: 15px 0;
  transition: background .3s ease,box-shadow .3s,-webkit-box-shadow .3s;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  touch-action: manipulation;
  background-image: none;
  user-select: none;
  -webkit-appearance: button;
  box-sizing: border-box;
  text-indent: 0px;
  text-shadow: none;
  outline:0;
  :hover {
    background-color: #15987e;
    box-shadow: 0 3px 0 #1abc9c;
  }
`

export default class ButtonComponent extends Component {
  render() {
    const {type} = this.props
    return (
      <Container>
        <Button className="btn btn-success" type={type}>{this.props.children}</Button>
      </Container>
    )
  }
}
