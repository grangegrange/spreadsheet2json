import React, { Component } from 'react';
import './App.scss';

import TableLoadingForm from './components/tableLoadingForm/TableLoadingForm'

// function App() {
class App extends Component {

    constructor() {
        super();

        this.state = {
            data: []
        };

    };


    render() {

        return (
            <div className="App">

                <div className={"wrapper"}>

                    <TableLoadingForm onResult={data => this.setState({ data })} />

                </div>


            </div>
        );

    }


}

export default App;
