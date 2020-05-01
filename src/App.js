import React, { Component } from 'react';
import './App.scss';
import TableLoadingForm from './components/tableLoadingForm/TableLoadingForm';
import Table from './components/table/Table';


class App extends Component {

    constructor() {
        super();
        this.state = {
            tabledData: [],
            selectedTableValue: ''
        };
    };


    render() {
        const { tabledData } = this.state;

        return (
            <div className="App">
                <div className={"wrapper"}>

                    <TableLoadingForm onResult={tabledData => this.setState({ tabledData })} />

                    {
                        (tabledData.length !== 0)
                            ? <Table
                                data={tabledData}
                                onSelect={selectedTableValue => this.setState({ selectedTableValue })}
                              />
                            : null
                    }


                </div>
            </div>
        );

    }

}

export default App;
