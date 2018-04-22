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
import DatePicker from '../Components/DatePicker'
import Button from '../Components/Button'
import AirportReducer, { AirportSelectors } from '../Redux/AirportRedux'

const options = [
  {'label': 'Germany', 'value': 'DE'},
  {'label': 'Russian Federation', 'value': 'RU'},
  {'label': 'United States', 'value': 'US'}
];

const formName = 'buscador'

class Buscador extends Component {
  searchFlights = () => {}

  render() {
    const {handleSubmit} = this.props

    return (
        <Card>
          <form onSubmit={handleSubmit(this.searchFlights)}>
            <Row responsive>
              <Field
                autoFocus
                label="Sair de"
                name="from"
                options={options}
                children={<SelectInput/>}
                component={FormField} />
              <Field 
                autoFocus
                label="Ir para"
                name="to"
                options={options}
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
                  label="Passageiros e classe do voo"
                  name="title"
                  component={FormField}
                  id="title"/>
                <Button>Pesquisar passagem</Button> 
              </Row> 
            </Row>
          </form>
        </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return  {
    submitting: state.waiting,
    from: SearchSelectors.selectFrom(state),
    to: SearchSelectors.selectTo(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    airportRequest: (field, terms) => dispatch(AirportReducer.airportRequest(field, terms))
  }
}


const enhance = compose(
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
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Buscador)
