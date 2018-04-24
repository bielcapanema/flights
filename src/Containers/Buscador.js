import React, { Component } from 'react';
import Card from '../Components/Card';
import { reduxForm, Field } from 'redux-form';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import FormField from '../Components/FormField';
import {
  Row
}  from '../Components/Organization';
import SelectInput from '../Components/SelectInput';
import DatePicker from '../Components/DatePicker';
import Button from '../Components/Button';
import AirportReducer from '../Redux/AirportRedux';
import FlightReducer from '../Redux/FlightRedux';
import debounce from 'lodash/debounce';
import { push as pushAction } from 'react-router-redux';
import SelectFlightClass from '../Components/SelectFlightClass'
import MoreLessInput from '../Components/MoreLessInput'
import moment from 'moment'

const formName = 'buscador';

class Buscador extends Component {
  searchFlights = (data) => {
    const postData = {
      tripType: data.inboundDate ? "RT" : "OW", 
      from: data.from && data.from.value,  //origem
      to: data.from ? data.to.value : undefined,  //destino
      outboundDate: data.outboundDate ? data.outboundDate.format("YYYY-MM-DD"): undefined, //data de partida
      inboundDate: data.inboundDate ? data.inboundDate.format("YYYY-MM-DD"): undefined, //data de volta
      cabin: data.cabin, //classe econômica (EC) ou executiva (EX)
      adults: parseInt(data.adults, 10), //adultos
      children: parseInt(data.children, 10), //crianças
      infants: parseInt(data.infants, 10) //bebês
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
                  placeholder="DD/MM/YYYY"
                  children={<DatePicker/>}
                  component={FormField} />
                <Field 
                  autoFocus
                  label="Data da volta"
                  name="inboundDate"
                  placeholder="OPICIONAL"
                  children={<DatePicker/>}
                  component={FormField} />
              </Row>
              <Row responsive column>
                <Field 
                  autoFocus
                  label="Classe do voo"
                  name="cabin"
                  children={<SelectFlightClass />}
                  component={FormField} />
                <Row minWidth="200px">  
                  <Field 
                    maxValue={10}
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
    initialValues: {cabin: "EC", adults: 1, infants: 0, children: 0, outboundDate: moment()}
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: formName,
    validate: (values, props) => {
        const errors = {};
        if (!values.from) {
            errors.from = 'Campo necessário.';
        }
        if (!values.to) {
          errors.to = 'Campo necessário.';
        }
        if (values.from === values.to) {
          errors.to = 'O destino deve ser diferente da origem!';
        }
        if(!values.outboundDate) {
            errors.outboundDate = 'Campo necessário.';
        }
        if(!values.adults || values.adults === '0') {
          errors.adults = 'Quantidade de adultos deve ser maior que 0.';
        }
        if(values.infants + values.children > values.adults) {
          errors.adults = 'Quantidade de adultos deve ser maior ou igual a quantidade de crianças e bebês.';
        }
        return errors;
    }
  }),
);

export default enhance(Buscador);
