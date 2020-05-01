import React, { Component } from 'react';
import styles from './TableLoadingForm.module.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import Loader from '../loader/Loader';


class TableLoadingForm extends Component {

    constructor() {
        super();

        this.state = {
            tableLink: '',
            tableName: '',
            tableJson: [],
            pending: false,
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
                (data && data.valueRanges)
                    ? this.setState({ tableJson: data.valueRanges[0].values, pending: false })
                    : this.setState({ errors: 'Ошибка загрузки. Проверьте ссылку и название таблицы', pending: false })
            })
            .catch(error => {
                console.log('err:', error);
                this.setState({ errors: error });
            });

    };


    render() {
        const { tableLink, tableName, pending, errors } = this.state;

        return (
            <form className={styles.tableLoadingForm} onSubmit={(e) => this.handleSubmit(e)}>

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

                <div className={styles.buttons}>
                    <Button text={'Загрузить таблицу'} pending={pending} onClick={(e) => this.handleSubmit(e)} />
                </div>

            </form>
        );
    }
}

export default TableLoadingForm;