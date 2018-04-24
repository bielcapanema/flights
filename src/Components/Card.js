import React, {
  Component
} from 'react';
import styled from 'react-emotion';

const Card = styled('div')
`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: ${props => props.height ? props.height : '100px' };
  width: ${props => props.width ? props.width : '200px' };
  background: #FFF;
  border-radius: 5px;
  box-shadow: 0 2px 1px rgba(0,0,0,.1);
  min-height: fit-content;
  min-width: ${props => props.minWidth ? props.minWidth : 'fit-content' };
  padding: 24px;
  margin: 8px;
  max-width: 700px;
`

export default Card;