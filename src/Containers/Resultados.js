import React, { Component } from 'react';
import Card from '../Components/Card';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import {
  Row
}  from '../Components/Organization';
import Loader from 'react-loaders'
import 'loaders.css'
import FlightReducer, { FlightSelectors } from '../Redux/FlightRedux'

class Resultados extends Component {
  render() {
    const {fetching, totalFlights} = this.props
    console.log(this.props)
    return (
        <Card minWidth="80%">
          <Row minWidth="100%" >
            {fetching && [<Loader type="ball-pulse" color="#2b82b2" />, 'carregando mais resultados...']}
            Total de voos encontrados: {totalFlights}
          </Row>
          <Row minWidth="100%"></Row>
          <Row minWidth="100%"></Row> 
        </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return  {
    fetching: FlightSelectors.selectFetching(state.flights),
    airlines: FlightSelectors.selectAirlines(state.flights),
    flights: FlightSelectors.selectFlights(state.flights),
    totalFlights: FlightSelectors.selectTotalFlighs(state.flights),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // airportRequest: (field, terms) => dispatch(AirportReducer.airportRequest(field, terms))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resultados)
