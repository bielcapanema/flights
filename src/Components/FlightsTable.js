import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class FlightsTable extends React.Component {
  render() {
    const { data } = this.props;
    console.log(data)
    return (
      <ReactTable
        style={{width: '100%'}}
        data={data}
        columns={[
          {
            Header: "Dados do voo",
            columns: [
              {
                Header: "Companhia",
                accessor: "airline"
              },
              {
                Header: "Partida",
                accessor: "departureDate"
              },
              {
                Header: "Tipo",
                accessor: "tipo"
              },
              {
                Header: "Chegada",
                accessor: "arrivalDate"
              }
            ]
          },
          {
            Header: "Preço",
            columns: [
              {
                Header: "Companhia aérea",
                accessor: "airlinePrice"
              },
              {
                Header: "MAXMILHAS",
                accessor: "milesPrice"
              },
              {
                Header: "DESCONTO",
                accessor: "desconto"
              }
            ]
          }
        ]}
        defaultSorted={[
          {
            id: "age",
            desc: true
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    );
  }
}
