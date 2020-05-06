import React, { useState, useEffect } from 'react';
import styles from './ValuesChangingPanel.module.scss';

function ValuesChangingPanel(props) {

    const [jsonValues, setJsonValues] = useState([]);

    useEffect(() => {
        if (Object.keys(props.jsonData).length > 0) {
            const jsonItems = props.jsonData['Main'].reduce((acc, rec) => {
                if (Object.values(acc).indexOf(rec.Values) === -1 && rec.Values !== undefined) {
                    return {...acc, [Object.keys(acc).length]: rec.Values}
                }
                return acc
            }, {});
            setJsonValues(jsonItems);
        }
    }, [props.jsonData]);

    const [selectedJsonValue, setSelectedJsonValue] = useState(-1);

    return (
        <div className={styles.panel}>
            {
                props.tableDataLength >= 0
                    ? <div>
                        <h3 className={styles.panelTitle}>Выберите значение в таблице:</h3>
                        {
                            props.tableValue
                                ? <div className={styles.valuesTable}>
                                    <p>Меняем значение из таблицы:</p>
                                    <code className={styles.valueTable}>{props.tableValue}</code>
                                  </div>
                                : null
                        }
                        {
                            Object.keys(jsonValues).length > 0 && props.tableValue
                                ? <div className={styles.valuesListJson}>
                                        <p>На значение из json:</p>
                                        {
                                            Object.values(jsonValues).map((item, i) => (
                                                <code
                                                    key={`json-value-${i}`}
                                                    data-id={i}
                                                    data-value={item}
                                                    className={ (i === selectedJsonValue) ? `${styles.resultJsonValue} ${styles.resultJsonValueSelected}` : `${styles.resultJsonValue}`}
                                                    onClick={() => { setSelectedJsonValue(i) }}
                                                >
                                                    {item}
                                                </code>
                                            ))
                                        }
                                    </div>
                                : null
                        }
                    </div>
                    : null
            }
        </div>
    );
}

export default ValuesChangingPanel;