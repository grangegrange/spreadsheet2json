import React from 'react';
import { JSONViewer } from 'react-json-editor-viewer';
import styles from './JsonWrapper.module.scss';

function JsonWrapper(props) {
    return (
        <div className={styles.jsonWrapper}>
            <div className={styles.jsonWrapperHeader}>
                Итоговый JSON:
            </div>
            <div className={styles.jsonEditor}>
                <JSONViewer
                    data={ props.data }
                />
            </div>
        </div>
    );
}

export default JsonWrapper;