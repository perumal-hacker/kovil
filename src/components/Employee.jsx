import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Employee.module.css";

const Employee = ({
  employee,
  openEditModal,
  handleDeleteEmployee,
}) => {
  // Ensure employee is defined and has the necessary fields
  if (!employee) {
    return <div>Loading...</div>;
  }

  const { _id, name, designation, address, income } = employee;

  const deleteEmployee = () => {
    handleDeleteEmployee(_id);
  };

  return (
    <div className={styles.employeeRow}>
      <div className={styles.photo}>
        <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
      </div>
      <div className={styles.details}>{name}</div>
      <div className={styles.details}>{designation}</div>
      <div className={styles.details}>{address}</div>
      <div className={styles.details}>₹{income}</div>
      <div className={styles.actions}>
        <button
          className={styles.editButton}
          onClick={() => openEditModal(employee)}
        >
          <FontAwesomeIcon icon={faPenToSquare} className={styles.editIcon} /> Edit
        </button>
        <button
          className={styles.deleteButton}
          onClick={deleteEmployee}
        >
          <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} /> Delete
        </button>
      </div>
    </div>
  );
};

export default Employee;
