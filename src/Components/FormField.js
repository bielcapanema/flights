import React from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px;
  width: 100%;
  min-width: ${props => props.minWidth ? props.minWidth : 'auto' };
`;
const InputWrapper = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0px;
`;

const Input = styled('input')`
  width: 100%;
  height: 50px;
  padding: 8px 0px;
`;

const FormField = (props) => {
  const {
    minWidth,
    children,
    input,
    label,
    type,
    meta: { asyncValidating, touched, error }
  } = props
  
  return (
    <Container minWidth={minWidth}>
      <label>{label}</label>
      <InputWrapper className={asyncValidating ? 'async-validating' : ''}>
        {children ? React.cloneElement(children, props) : <Input {...input} type={type} placeholder={label} />}
        {touched && error && <span>{error}</span>}
      </InputWrapper>
    </Container>
  )
}

export default FormField;
