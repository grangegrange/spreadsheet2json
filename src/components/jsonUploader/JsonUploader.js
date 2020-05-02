import React, { Component } from 'react';
import styles from './JsonUploader.module.scss';

import Loader from '../loader/Loader';



// function JsonUploader() {
class JsonUploader extends Component {

    constructor() {
        super();
        this.state = {
            fileName: '',
            pending: false
        };
    };


    readJsonFile = (e) => {

        this.setState({ pending: true });
        const reader = new FileReader();

        if (e.target.files && e.target.files[0]) {
            this.setState({ fileName: e.target.files[0].name });
            reader.readAsText(e.target.files[0]);
        } else {
            this.setState({ pending: false });
        }

        reader.onload = async (event) => {
            this.setState({ pending: false });
            this.props.onResult(JSON.parse(event.target.result));
        };

    };


    render() {
        const { pending, fileName } = this.state;

        return (


                <div
                    className={styles.uploadArea}
                    onChange={(e) => this.readJsonFile(e)}
                >
                    <label
                        htmlFor="upload-input"
                        className={styles.uploadLabel}
                    >
                        {
                            !pending
                                ? (
                                    (fileName === '')
                                        ? <p className={styles.uploadLabelText}>Загрузить JSON</p>
                                        : <p className={styles.uploadedLabelText}>
                                            <span>Загрузить другой JSON</span>
                                            <span className={styles.uploadedLabelName}>Загружен {fileName}</span>
                                          </p>
                                  )
                                : <Loader />
                        }
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept=".json"
                        id="upload-input"
                        className={styles.uploadInput}
                    />
                </div>

            // </div>
        );


    };


};

export default JsonUploader;