import React from 'react'
import styled from 'react-emotion';
import {Link} from 'react-router-dom'

const Logo = styled('div')`
  display: block;
  width: 137px;
  height: 40px;
  background: url(https://static.maxmilhas.com.br/img/logo-mm-grey.svg) no-repeat;
  background-size: contain;
  margin: 0;
  float: left;
  z-index: 99;
  position: relative;
  color: #fff;
  margin-bottom: 24px;
`


export default () => {
  return (
    <Link to="/buscador">
     <Logo />
    </Link>
  )
}
