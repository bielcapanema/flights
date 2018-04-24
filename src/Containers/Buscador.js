import React, { Component } from 'react';
import Card from '../Components/Card';
import { reduxForm, Field, change, SubmissionError } from 'redux-form';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import FormField from '../Components/FormField';
import styled from 'react-emotion';
import {
  Row
}  from '../Components/Organization';
import SelectInput from '../Components/SelectInput';
import DatePicker from '../Components/DatePicker';
import Button from '../Components/Button';
import AirportReducer, { AirportSelectors } from '../Redux/AirportRedux';
import FlightReducer from '../Redux/FlightRedux';
import debounce from 'lodash/debounce';
import { push as pushAction } from 'react-router-redux';
import SelectFlightClass from '../Components/SelectFlightClass'
import MoreLessInput from '../Components/MoreLessInput'

const options = [
  {'label': 'Germany', 'value': 'DE'},
  {'label': 'Russian Federation', 'value': 'RU'},
  {'label': 'United States', 'value': 'US'}
];

const formName = 'buscador';

class Buscador extends Component {
  searchFlights = (data) => {
    const postData = {
      tripType: data.inboundDate ? "RT" : "OW", 
      from: data.from.value,  //origem
      to: data.to.value,  //destino
      outboundDate: data.outboundDate ? data.outboundDate.format("YYYY-MM-DD"): undefined, //data de partida
      inboundDate: data.inboundDate ? data.inboundDate.format("YYYY-MM-DD"): undefined, //data de volta
      cabin: data.cabin, //classe econômica (EC) ou executiva (EX)
      adults: data.adults, //adultos
      children: data.children, //crianças
      infants: data.infants //bebês
    } 
    this.props.flightsRequest(postData)
    this.props.push('/resultados')
  }
  
  componentDidMount() {
    this.props.airportRequest('to', 'belo')
    this.props.airportRequest('from', 'belo')
  }

  handleSearch = debounce((field, terms = '') => {
    if(terms.length > 2)
      this.props.airportRequest(field, terms);
  }, 500)

  render() {
    const {handleSubmit, optionsFrom, optionsTo} = this.props

    return (
        <Card>
          <form onSubmit={handleSubmit(this.searchFlights)}>
            <Row responsive>
              <Field
                handleSearch={(terms) => this.handleSearch('from', terms)}
                label="Sair de"
                name="from"
                placeholder="CIDADE OU AEROPORTO DE ORIGEM"
                noResultsText="Nenhum aeroporto ou cidade encontrado."
                options={optionsFrom}
                children={<SelectInput/>}
                component={FormField} />
              <Field 
                handleSearch={(terms) => this.handleSearch('to', terms)}
                placeholder="CIDADE OU AEROPORTO DE DESTINO"
                noResultsText="Nenhum aeroporto ou cidade encontrado."
                label="Ir para"
                name="to"
                options={optionsTo}
                children={<SelectInput/>}
                component={FormField} />
            </Row>
            <Row responsive>  
              <Row >  
                <Field 
                  className
                  autoFocus
                  label="Data da ida"
                  name="outboundDate"
                  children={<DatePicker/>}
                  component={FormField} />
                <Field 
                  autoFocus
                  label="Data da volta"
                  name="inboundDate"
                  children={<DatePicker/>}
                  component={FormField} />
              </Row>
              <Row responsive>
                <Field 
                  autoFocus
                  label="Classe do voo"
                  name="cabin"
                  children={<SelectFlightClass />}
                  component={FormField} />
                <Row responsive>  
                  <Field 
                    autoFocus
                    label="Adultos"
                    name="adults"
                    children={<MoreLessInput />}
                    component={FormField} />  
                  <Field 
                    autoFocus
                    label="Crianças"
                    name="children"
                    children={<MoreLessInput />}
                    component={FormField} /> 
                  <Field 
                    autoFocus
                    label="Bebês"
                    name="infants"
                    children={<MoreLessInput />}
                    component={FormField} />       
                </Row>
              </Row> 
            </Row>
            <Button type="submit">
              <i className="icon-search"/> Pesquisar passagem
            </Button> 
          </form>
        </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return  {
    submitting: state.waiting,
    optionsFrom: state.airports.from.map(({iata, city, name}) => { return {value: iata, label: `${name} - ${city}`} }),
    optionsTo: state.airports.to.map(({iata, city, name}) => { return {value: iata, label: `${name} - ${city}`} }),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    airportRequest: (field, terms) => dispatch(AirportReducer.airportRequest(field, terms)),
    flightsRequest: (postData) => dispatch(FlightReducer.flightsRequest(postData)),
    push: (...params) => dispatch(pushAction(...params)),
    initialValues: {cabin: "EC", adults: 1}
  }
}


const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: formName,
    validate: (values, props) => {
        const errors = {};
        // if (!values.title) {
        //     errors.title = 'Dê um título ao seu post.';
        // }
        // if(!values.text) {
        //     errors.text = 'Seu post deve ter algum conteúdo.';
        // }
        return errors;
    }
  }),
);

export default enhance(Buscador);
