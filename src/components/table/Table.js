import React from 'react';
import styles from './Table.module.scss';

function Table(props) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table} >
                <thead className={styles.tableHeader}>
                    <tr className={styles.tableHeaderRow}>
                        {
                            (props.data && props.data[0])
                                ? props.data[0].map((cell, i)=> (
                                    <th
                                        key={`title-${i}`}
                                        className={styles.tableHeaderCell}
                                    >
                                        { cell }
                                    </th>
                                ))
                                : null
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    (props.data)
                        ? props.data.slice(1).map((row, i)=> (
                            <tr
                                key={`row-${i}`}
                                className={styles.tableRow}
                            >

                                {
                                    row.map((cell, j) => (
                                        <td
                                            key={`cell-${j}`}
                                            data-value={cell}
                                            className={styles.tableCell}
                                            onClick={(e) => props.onSelect(e.target.dataset.value)}
                                        >
                                            { cell }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                        : null
                }
                </tbody>
            </table>
        </div>
    );
}

export default Table;