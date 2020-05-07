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
            jsonData: {}
        };
    };


    handleJsonValuesChange = (value, selectedJsonValue) => {

        const newJsonValues = {...value, [selectedJsonValue]: this.state.selectedTableValue };
        const newJsonTemplate = {...this.state.jsonData};

        const newJsonMainTemplate = newJsonTemplate["Main"].reduce((acc, rec) => {
            const prevIndex = Object.values(value).indexOf(rec.Values);
            const curIndex = Object.values(newJsonValues).indexOf(rec.Values);
            if (prevIndex !== curIndex) {
                return [...acc, {...rec, Values: newJsonValues[prevIndex] }];
            }
            return [...acc, rec];
        }, []);

        newJsonTemplate["Main"] = newJsonMainTemplate;

        this.setState({ jsonData: newJsonTemplate });

    };

    render() {
        const { tabledData, jsonData, selectedTableValue } = this.state;

        return (
            <div className={styles.App}>
                <div className={styles.wrapper}>

                    <TableLoadingForm
                        onTableResult={tabledData => this.setState({ tabledData })}
                        onJsonResult={jsonData => this.setState({ jsonData })}
                        tableValue={selectedTableValue}
                        jsonData={jsonData}
                        tableDataLength={tabledData.length}
                        handleJsonValuesChange={(jsonData, selectedJsonValue) => this.handleJsonValuesChange(jsonData, selectedJsonValue)}
                    />

                    <div className={styles.editors}>
                        <ResizablePanels
                            bkcolor="#ffffff"
                            displayDirection="column"
                            width="100%"
                            height="100vh"
                            panelsSize={[50, 50]}
                            sizeUnitMeasure="%"
                            resizerColor="#6c7ae0"
                            resizerSize="2px"
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
                                    : <div className={styles.editorIsEmpty}>Загрузите таблицу</div>
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
                                    :   <div className={styles.editorIsEmpty}>Загрузите JSON</div>
                            }
                        </ResizablePanels>
                    </div>

                </div>
            </div>
        );

    }

}

export default App;
