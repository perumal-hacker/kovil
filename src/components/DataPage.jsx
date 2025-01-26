import React, { useState, useEffect } from "react";
import styles from "../styles/DataPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPen, faPlusCircle, faUserCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NewDataShow = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [taxForms, setTaxForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaxForms = async () => {
      try {
        const response = await fetch("http://localhost:8080/tax-form");
        const data = await response.json();
        setTaxForms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tax forms:", error);
        setLoading(false);
      }
    };

    fetchTaxForms();
  }, []);

  const filteredData = taxForms.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const groupByPlace = (data) => {
    return data.reduce((result, item) => {
      if (!result[item.place]) {
        result[item.place] = [];
      }
      result[item.place].push(item);
      return result;
    }, {});
  };

  const groupedData = groupByPlace(filteredData);

  const handleEdit = (row) => {
    setEditData(row);
    setFormData({ ...row });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const response = await fetch(`http://localhost:8080/tax-form/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Entry deleted successfully!");
          setTaxForms((prevForms) => prevForms.filter((item) => item._id !== id));
        } else {
          alert("Failed to delete entry");
        }
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/tax-form/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Data updated successfully!");
        setEditData(null);
        setTaxForms((prevForms) =>
          prevForms.map((item) => (item._id === formData._id ? formData : item))
        );
      } else {
        alert("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleAdd = () => {
    navigate("/dashboard/tax-form");
  };

  const closeModal = () => {
    setEditData(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1>DATA</h1>
          <div className={styles.userInfo}>
            <span>Administrator</span>
            <FontAwesomeIcon icon={faUserCircle} className={styles.userIcon} />
          </div>
        </header>

        <div className={styles.search}>
          <FontAwesomeIcon icon={faSearch} className={styles.icon} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <p>Loading...</p>}

        {Object.keys(groupedData).length > 0 ? (
          Object.keys(groupedData).map((place) => (
            <section key={place} className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>{place}</h3>
                <button className={styles.addButton} onClick={handleAdd}>
                  Add <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </div>

              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>பெயர்</th>
                    <th>தகப்பனார் பெயர்</th>
                    <th>பிறந்த தேதி</th>
                    <th>ஆதார் எண்</th>
                    <th>செல் நெ.</th>
                    <th>வாட்ஸ் அப் நெ.</th>
                    <th>மின்னஞ்சல் முகவரி</th>
                    <th>முகவரி</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedData[place].map((row, index) => (
                    <tr key={index}>
                      <td>{row.name}</td>
                      <td>{row.fatherName}</td>
                      <td>{row.dob}</td>
                      <td>{row.aadharNumber}</td>
                      <td>{row.phoneNumber}</td>
                      <td>{row.whatsappNumber}</td>
                      <td>{row.email}</td>
                      <td>{row.address}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          className={styles.editIcon}
                          onClick={() => handleEdit(row)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={styles.deleteIcon}
                          onClick={() => handleDelete(row._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))
        ) : (
          <p className={styles.noResults}>No results found.</p>
        )}

        {editData && (
          <div className={styles.formContainer}>
            <div className={styles.formModal}>
              <button className={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
              <h2>Edit Data</h2>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Father Name:
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Date of Birth:
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Aadhar Number:
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Whatsapp Number:
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={formData.whatsappNumber || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <button type="submit">Save Changes</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewDataShow;
