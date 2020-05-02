import React, { Component } from 'react';
import styles from './App.scss';
import TableLoadingForm from './components/tableLoadingForm/TableLoadingForm';
import Table from './components/table/Table';
import JsonWrapper from './components/jsonWrapper/JsonWrapper';



class App extends Component {

    constructor() {
        super();
        this.state = {
            tabledData: [],
            selectedTableValue: '',
            jsonData: {}
        };
    };


    render() {
        const { tabledData, jsonData } = this.state;

        return (
            <div className="App">
                <div className={"wrapper"}>

                    <TableLoadingForm
                        onTableResult={tabledData => this.setState({ tabledData })}
                        onJsonResult={jsonData => this.setState({ jsonData })}
                    />

                    {
                        (tabledData.length > 0)
                            ? <Table
                                data={tabledData}
                                onSelect={selectedTableValue => this.setState({ selectedTableValue })}
                              />
                            : null
                    }

                    {
                        (Object.keys(jsonData).length > 0)
                            ?   <JsonWrapper data={jsonData} />
                            :   null
                    }

                </div>
            </div>
        );

    }

}

export default App;
