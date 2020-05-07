import React, { useState, useEffect } from 'react';
import { Base64 } from 'js-base64';
import styles from './ValuesChangingPanel.module.scss';
import Button from '../button/Button';

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
                        {
                            !props.tableValue
                                ? <h3 className={styles.panelTitle}>Выберите значение в таблице</h3>
                                : null
                        }

                        {
                            props.tableValue
                                ? <div className={styles.panelTableValues}>
                                    <p className={styles.panelSubtitle}>Меняем значение из таблицы:</p>
                                    <code className={styles.panelTableValue}>{props.tableValue}</code>
                                  </div>
                                : null
                        }
                        {
                            Object.keys(jsonValues).length > 0 && props.tableValue
                                ? <div className={styles.panelJsonValuesWrapper}>
                                        <p className={styles.panelSubtitle}>На значение из json:</p>
                                        <div className={styles.panelJsonValues}>
                                        {
                                            Object.values(jsonValues).map((item, i) => (
                                                <code
                                                    key={`json-value-${i}`}
                                                    data-id={i}
                                                    data-value={item}
                                                    className={ (i === selectedJsonValue) ? `${styles.panelJsonValue} ${styles.panelJsonValueSelected}` : `${styles.panelJsonValue}`}
                                                    onClick={() => { setSelectedJsonValue(i) }}
                                                >
                                                    {item}
                                                </code>
                                            ))
                                        }
                                        </div>
                                    </div>
                                : null
                        }
                        {
                            selectedJsonValue >= 0
                                ? <Button text={'Заменить значения'} onClick={() => props.handleJsonValuesChange(jsonValues, selectedJsonValue)} />
                                : null
                        }
                        {
                            Object.keys(jsonValues).length > 0 && props.tableValue
                                ? <a
                                    download={"template-edited.json"}
                                    href={`data:application/octet-stream;base64,${Base64.encode(JSON.stringify(props.jsonData))}`}
                                    className={styles.panelJsonDownload}
                                  >
                                    Скачать JSON
                                  </a>
                                : null
                        }
                    </div>
                    : null
            }
        </div>
    );
}

export default ValuesChangingPanel;