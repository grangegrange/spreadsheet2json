import React, { Component } from 'react';
import styles from './TableLoadingForm.module.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import JsonUploader from '../jsonUploader/JsonUploader';
import ValuesChangingPanel from '../valuesChangingPanel/ValuesChangingPanel';

class TableLoadingForm extends Component {

    constructor() {
        super();

        this.state = {
            tableLink: '',
            tableName: '',
            pending: false,
            showValuesPanel: false,
            errors: ''
        };

    };


    handleInputChange = (event, name) => {
        this.setState({ [name]: event.target.value });
    };


    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.tableLink === '' || this.state.tableName === '') {
            this.setState({ errors: 'Заполните поля. Ссылку и название таблицы. Пример ссылки - https://docs.google.com/spreadsheets/d/1b-FDsgg9Zu6r_rxkdKAYCnEX4ydEtvcb2y3u5WpbeLk/edit#gid=802941491)' });
            return false;
        }

        if (this.state.tableLink.indexOf('spreadsheets/d/') === -1) {
            this.setState({ errors: 'Ссылка некорректная. Пример ссылки - https://docs.google.com/spreadsheets/d/1b-FDsgg9Zu6r_rxkdKAYCnEX4ydEtvcb2y3u5WpbeLk/edit#gid=802941491' });
            return false;
        }

        this.setState({ errors: '', pending: true });
        const tableId = this.state.tableLink.split('spreadsheets/d/')[1].split('/')[0];

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${tableId}/values:batchGet?ranges=${this.state.tableName}&key=AIzaSyANhJgoETUA9_wux5ZynNigSYooSGp0-9k`)
            .then(response => response.json())
            .then(data => {
                if (data && data.valueRanges) {
                    this.props.onTableResult(data.valueRanges[0].values)
                    this.setState({ pending: false, showValuesPanel: true })
                } else {
                    this.props.onTableResult([])
                    this.setState({ errors: 'Ошибка загрузки. Проверьте ссылку и название таблицы', pending: false, showValuesPanel: false })
                }
            })
            .catch(error => {
                console.log('err:', error);
                this.setState({ errors: error, showValuesPanel: false });
            });

    };


    render() {
        const { tableLink, tableName, pending, showValuesPanel, errors } = this.state;
        const { jsonData, tableValue, tableDataLength } = this.props;

        return (
            <div className={styles.tableLoadingForm}>

                <form className={styles.tableLoadingFormWrapper} onSubmit={(e) => this.handleSubmit(e)}>

                    <div className={styles.inputs}>

                        <div className={styles.inputsRow}>
                            <div className={styles.inputLink}>
                                <Input
                                    name={'link'}
                                    placeholder={'Ссылка на таблицу'}
                                    value={tableLink}
                                    onChange={(e) => this.handleInputChange(e, 'tableLink')}
                                />
                            </div>
                            <div className={styles.inputName}>
                                <Input
                                    name={'name'}
                                    placeholder={'Название таблицы'}
                                    value={tableName}
                                    onChange={(e) => this.handleInputChange(e, 'tableName')}
                                />
                            </div>
                        </div>

                        {
                            errors
                                ? <div className={styles.inputsErrors}>
                                    <p className={styles.errorText}>{errors}</p>
                                </div>
                                : null
                        }

                    </div>

                    <div className={styles.buttonTable}>
                        <Button text={'Загрузить таблицу'} pending={pending} onClick={(e) => this.handleSubmit(e)} />
                    </div>

                    <div className={styles.buttonJson}>
                        <JsonUploader onResult={jsonData => this.props.onJsonResult(jsonData) } />
                    </div>

                </form>

                {
                    showValuesPanel
                        ? <ValuesChangingPanel
                            jsonData={jsonData}
                            tableValue={tableValue}
                            tableDataLength={tableDataLength}
                            handleJsonValuesChange={(jsonData, selectedJsonValue) => this.props.handleJsonValuesChange(jsonData, selectedJsonValue)}
                          />
                        : null
                }


            </div>
        );
    }
}

export default TableLoadingForm;