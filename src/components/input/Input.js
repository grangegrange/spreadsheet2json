import React from 'react';
import styles from './Input.module.scss';

function Input(props) {
    return (
        <div className={styles.inputWrapper}>
            <input
                type="text"
                name={props.name}
                className={styles.input}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e)}
            />
        </div>
    );
}

export default Input;