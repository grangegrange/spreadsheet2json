import React from 'react';
import styles from './Button.module.scss';

function Button(props) {
    return (
        <div className={styles.buttonWrapper}>
            <button
                className={styles.button}
                onClick={(e) => props.onClick(e)}
            >
                {props.text}
            </button>
        </div>
    );
}

export default Button;