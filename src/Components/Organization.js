import React from 'react';
import styled from 'react-emotion';

export const Row = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex: 1;
  align-items: flex-end;
  min-width: ${props => props.minWidth ? props.minWidth : 'auto' };
  ${props => props.responsive && `@media (max-width: 720px) {
    flex-direction: column;
  }` || ''}
`;