import React from 'react';
import styles from './Button.module.scss';
import Loader from '../loader/Loader';

function Button(props) {
    return (
        <div className={styles.buttonWrapper}>
            <button
                className={styles.button}
                onClick={(e) => props.onClick(e)}
                disabled={props.pending}
            >
                {
                    !props.pending
                        ? <p className={styles.text}>{props.text}</p>
                        : <Loader />
                }
            </button>
        </div>
    );
}

export default Button;