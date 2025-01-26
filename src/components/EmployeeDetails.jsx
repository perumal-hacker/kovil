import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/EmployeeDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlusCircle, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import EmployeeHeader from "./EmployeeHeader";
import Employee from "./Employee"; // Import Employee component

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    designation: "",
    address: "",
    income: "",
  });

  // Fetch employees from backend
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8080/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  };

  // Handle Add Employee
  const handleAddEmployee = () => {
    axios
      .post("http://localhost:8080/employees", employeeForm)
      .then(() => {
        fetchEmployees(); // Fetch the updated list after adding
        closeModal();
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  // Handle Edit Employee
  const handleEditEmployee = () => {
    axios
      .put(`http://localhost:8080/employees/${currentEmployee._id}`, employeeForm)
      .then(() => {
        fetchEmployees(); // Fetch the updated list after editing
        closeModal();
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  // Handle Delete Employee
  const handleDeleteEmployee = (id) => {
    axios
      .delete(`http://localhost:8080/employees/${id}`)
      .then(() => {
        fetchEmployees(); // Fetch the updated list after deleting
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  // Open Modal for Add
  const openAddModal = () => {
    setIsEditing(false);
    setEmployeeForm({ name: "", designation: "", address: "", income: "" });
    setShowModal(true);
  };

  // Open Modal for Edit
  const openEditModal = (employee) => {
    setIsEditing(true);
    setCurrentEmployee(employee);
    setEmployeeForm({
      name: employee.name,
      designation: employee.designation,
      address: employee.address,
      income: employee.income,
    });
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setEmployeeForm({ name: "", designation: "", address: "", income: "" });
    setCurrentEmployee(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>EMPLOYEE DETAILS</h1>
        <div className={styles.adminControls}>
          <span>Administrator</span>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <button className={styles.addEmployee} onClick={openAddModal}>
            <FontAwesomeIcon icon={faPlusCircle} /> Add Employee
          </button>
        </div>
      </header>
      <div className={styles.employeeList}>
        <EmployeeHeader />
        {employees.map((employee) => (
          <Employee
            key={employee._id}
            employee={employee}
            setEmployees={setEmployees}
            employees={employees}
            openEditModal={openEditModal}
            handleDeleteEmployee={handleDeleteEmployee}
          />
        ))}
      </div>

      {/* Modal for Add/Edit Employee */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{isEditing ? "Edit Employee" : "Add New Employee"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isEditing ? handleEditEmployee() : handleAddEmployee();
              }}
            >
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  value={employeeForm.name}
                  onChange={(e) =>
                    setEmployeeForm({ ...employeeForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Designation</label>
                <input
                  type="text"
                  value={employeeForm.designation}
                  onChange={(e) =>
                    setEmployeeForm({
                      ...employeeForm,
                      designation: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Address</label>
                <input
                  type="text"
                  value={employeeForm.address}
                  onChange={(e) =>
                    setEmployeeForm({ ...employeeForm, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Income</label>
                <input
                  type="number"
                  value={employeeForm.income}
                  onChange={(e) =>
                    setEmployeeForm({ ...employeeForm, income: e.target.value })
                  }
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveButton}>
                  {isEditing ? "Save Changes" : "Save"}
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
