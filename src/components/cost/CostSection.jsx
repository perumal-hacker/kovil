import React from 'react';
import styles from './CostSection.module.css';

function CostSection({ date, total, items }) {
  return (
    <section>
      <div className={styles.section}>
      <h2>{date}</h2>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.textLeft}>Item</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className={styles.textLeft}>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
          <tr>
            <td className={styles.textLeft}><strong>Total</strong></td>
            <td></td>
            <td><strong>{total}</strong></td>
          </tr>
        </tbody>
      </table>
      </div>
    </section>
  );
}

export default CostSection;
