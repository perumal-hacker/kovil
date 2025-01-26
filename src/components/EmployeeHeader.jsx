import React from "react";
import styles from "../styles/Employee.module.css";

const EmployeeHeader = () => {
  return (
    <div className={styles.employeeRow} id={styles.employeeHeader}>
      <div className={styles.photo}>
        <h3>PHOTO</h3>
      </div>
      <div className={styles.details}>
        <h3>NAME</h3>
      </div>
      <div className={styles.details}>
        <h3>DESIGNATION</h3>
      </div>
      <div className={styles.details}>
        <h3>ADDRESS</h3>
      </div>
      <div className={styles.details}>
        <h3>INCOME</h3>
      </div>
      <div className={styles.actions}>
        <h3>EDIT</h3>
      </div>
    </div>
  );
};

export default EmployeeHeader;
