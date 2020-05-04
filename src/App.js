import React, { Component } from 'react';
import ResizablePanels from "resizable-panels-react";
import styles from './App.module.scss';
import TableLoadingForm from './components/tableLoadingForm/TableLoadingForm';
import Table from './components/table/Table';
import JsonWrapper from './components/jsonWrapper/JsonWrapper';


class App extends Component {

    constructor() {
        super();
        this.state = {
            tabledData: [],
            selectedTableValue: '',
            jsonData: {},
            width: 200,
            height: 200,
            x: 10,
            y: 10
        };
    };

    render() {
        const { tabledData, jsonData } = this.state;

        return (
            <div className={styles.App}>
                <div className={styles.wrapper}>

                    <TableLoadingForm
                        onTableResult={tabledData => this.setState({ tabledData })}
                        onJsonResult={jsonData => this.setState({ jsonData })}
                    />

                    <div className={styles.editors}>
                        {
                            ((tabledData.length > 0) || Object.keys(jsonData).length > 0)
                                ? <ResizablePanels
                                    bkcolor="#ffffff"
                                    displayDirection="column"
                                    width="100%"
                                    height="100vh"
                                    panelsSize={[50, 50]}
                                    sizeUnitMeasure="%"
                                    resizerColor="#ff9900"
                                    resizerSize="10px"
                                >
                                    {
                                        (tabledData.length > 0)
                                            ? <Table
                                                data={tabledData}
                                                onSelect={selectedTableValue => this.setState({selectedTableValue})}
                                                style={{
                                                    background: "#ffffff",
                                                    height: "100%",
                                                    width: "100%"
                                                }}
                                            />
                                            : <div>Загрузите таблицу</div>
                                    }
                                    {
                                        (Object.keys(jsonData).length > 0)
                                            ?   <JsonWrapper
                                                data={jsonData}
                                                style={{
                                                    background: "#ffffff",
                                                    height: "100%"
                                                }}
                                            />
                                            :   <div>Загрузите JSON</div>
                                    }
                                </ResizablePanels>
                                : null
                        }
                    </div>

                </div>
            </div>
        );

    }

}

export default App;
