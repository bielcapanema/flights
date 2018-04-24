import styled from 'react-emotion';

export const Row = styled('div')`
  flex-direction: ${props => props.column ? 'column' : 'row' };
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex: 1;
  align-items: ${props => props.center ? 'center' : 'flex-start' };
  justify-content: ${props => props.center ? 'center' : 'inherit' };
  margin: ${props => props.margin ? '16px' : 'inherit' };
  text-align: ${props => props.center ? 'center' : 'inherit' };
  min-width: ${props => props.minWidth ? props.minWidth : 'auto' };
  ${props => props.responsive && `@media (max-width: 720px) {
    flex-direction: column;
  }` || ''}
`;

export const Passageiros = styled('div')`
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