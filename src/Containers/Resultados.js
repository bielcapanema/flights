import React, { Component } from 'react';
import Card from '../Components/Card';
import {connect} from 'react-redux';
import {
  Row
}  from '../Components/Organization';
import Loader from 'react-loaders'
import 'loaders.css'
import { FlightSelectors } from '../Redux/FlightRedux';
import FlightsTable from '../Components/FlightsTable'
import map from 'lodash/map'

class Resultados extends Component {

  calcDesconto = (miles, airline) => {
    let desconto = ''
    if(miles && airline && miles.fareTotal < airline.fareTotal) {
      desconto = `${ 100 - parseInt((miles.fareTotal * 100) / airline.fareTotal)}%`
    }
    return desconto
  }


  
  organizeArrayData = () => {
    const {flights} = this.props
    const arrayTrips = []
    map(flights, (airline) => {
      map(airline.outbound, flight => {
        let desconto;
        if(flight.pricing.miles && flight.pricing.airline && 
          flight.pricing.miles.fareTotal < flight.pricing.airline.fareTotal) {
          desconto = (flight.pricing.miles.fareTotal * 100) / flight.pricing.airline.fareTotal
        }
        arrayTrips.push({...flight, 
          airlinePrice: flight.pricing.airline && flight.pricing.airline.fareTotal.toFixed(2),
          milesPrice: flight.pricing.miles && flight.pricing.miles.fareTotal.toFixed(2),
          desconto: desconto && `${ 100 - parseInt(desconto, 10)}%`,
          tipo: flight.trips.length === 1 ? 'Direto' : `${flight.trips.length - 1} parada`
        })
      })
      map(airline.inbound, flight => {
        let desconto;
        if(flight.pricing.miles && flight.pricing.airline && 
          flight.pricing.miles.fareTotal < flight.pricing.airline.fareTotal) {
          desconto = (flight.pricing.miles.fareTotal * 100) / flight.pricing.airline.fareTotal
        }
        arrayTrips.push({...flight, 
          airlinePrice: flight.pricing.airline && flight.pricing.airline.fareTotal.toFixed(2),
          milesPrice: flight.pricing.miles && flight.pricing.miles.fareTotal.toFixed(2),
          desconto: desconto && `${ 100 - parseInt(desconto, 10)}%`,
          tipo: flight.trips.length === 1 ? 'Direto' : `${flight.trips.length - 1} parada`
        })
      })
    })
    return arrayTrips
  }

  render() {
    const {fetching, totalFlights} = this.props
    return (
        <Card minWidth="80%">
          <Row minWidth="100%" center margin>
            {fetching && <div> <Loader type="ball-pulse" color="#2b82b2" /> carregando mais resultados...</div>}
          </Row>
          <Row minWidth="100%" >
            Total de voos encontrados: {totalFlights}
          </Row>
          <FlightsTable data={this.organizeArrayData()}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Resultados);
