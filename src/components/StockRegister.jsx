import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/StockRegister.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit } from "@fortawesome/free-solid-svg-icons";
import AddItemInStock from "./AddItemInStock";

const StockRegister = () => {
  const [branch, setBranch] = useState("Branch 1");
  const [category, setCategory] = useState("Pooja");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const inputRefs = useRef({});

  const defaultCategories = ["Pooja", "Ritual Items", "Food & Prasadam"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/stock/${branch}`);
        const filteredItems = response.data.filter((item) => item.category === category);
        setItems(filteredItems);
      } catch (error) {
        console.error("There was an error fetching stock data:", error);
      }
    };

    fetchData();
  }, [branch, category]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const matchingItems = items.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setNotFound(matchingItems.length === 0);
  };

  const handleUpdate = async (id, usedValue, addedValue) => {
    if (!id) {
      alert("Invalid item ID.");
      return;
    }

    const used = parseInt(usedValue) || 0;
    const added = parseInt(addedValue) || 0;

    if (used < 0 || added < 0) {
      alert("Values for 'Used' and 'Added' must be non-negative.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/stock/update/${id}`, { used, added });
      const updatedItem = response.data;

      setItems((prevItems) =>
        prevItems.map((item) => (item._id === id ? updatedItem : item))
      );

      alert("Stock updated successfully!");
    } catch (error) {
      alert("Error updating stock!");
      console.error("Error:", error);
    }
  };

  const handleAddItem = async (newItem) => {
    const itemWithBranch = { ...newItem, branch };

    try {
      const response = await axios.post("http://localhost:8080/api/stock/add", itemWithBranch);
      setItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error("Error adding the stock item:", error);
    }
  };

  const handleEdit = (category, itemId) => {
    const itemToEdit = items.find((item) => item._id === itemId);
    if (itemToEdit) {
      setEditItem(itemToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSubmit = async (updatedItem) => {
    try {
      console.log("Submitting updated item:", updatedItem); // Log the updated item to debug
  
      // Ensure all necessary fields are filled
      if (!updatedItem.name || !updatedItem.category || updatedItem.inStock < 0) {
        alert("Please fill out all fields with valid values.");
        return;
      }
  
      // Make the PUT request to update the item
      const response = await axios.put(`http://localhost:8080/api/stock/edit/${updatedItem._id}`, updatedItem);
  
      console.log("Updated item response:", response.data); // Log the response data
  
      // Update the state with the updated item
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === response.data._id ? response.data : item))
      );
  
      setIsEditModalOpen(false);
      alert("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error); // Log the error
      alert("Error updating the item!");
    }
  };
  

  const currentItems = searchQuery
    ? items.filter((item) => item.name.toLowerCase().includes(searchQuery))
    : items;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Stock Register</h1>
      <div className={styles.filters}>
        <div>
          <label>Select Branch: </label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className={styles.select}
          >
            <option value="Branch 1">Branch 1</option>
            <option value="Branch 2">Branch 2</option>
          </select>
        </div>
        <div>
          <label>Category: </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSearchQuery("");
              setNotFound(false);
            }}
            className={styles.select}
          >
            {defaultCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.search}>
          <FontAwesomeIcon icon={faSearch} className={styles.icon} />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div>
        <h2 className={styles.title}>{category}</h2>
        {notFound && <p className={styles.notFoundMessage}>Not Found in {category}</p>}
        <div className={styles.scrollableTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Before</th>
                <th>Used</th>
                <th>Added</th>
                <th>In Stock</th>
                <th>Update</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.before}</td>
                  <td>
                    <input
                      type="number"
                      className={styles.numberInput}
                      placeholder="Use"
                      ref={(el) => {
                        if (!inputRefs.current[item._id]) {
                          inputRefs.current[item._id] = {};
                        }
                        inputRefs.current[item._id].used = el;
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className={styles.numberInput}
                      placeholder="Add"
                      ref={(el) => {
                        if (!inputRefs.current[item._id]) {
                          inputRefs.current[item._id] = {};
                        }
                        inputRefs.current[item._id].added = el;
                      }}
                    />
                  </td>
                  <td
                    className={item.inStock < item.minstock ? styles.lowStock : styles.normalStock}
                  >
                    {item.inStock}
                  </td>
                  <td>
                    <button
                      className={styles.updateButton}
                      onClick={() =>
                        handleUpdate(
                          item._id,
                          inputRefs.current[item._id]?.used?.value,
                          inputRefs.current[item._id]?.added?.value
                        )
                      }
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={styles.editIcon}
                      onClick={() => handleEdit(category, item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className={styles.addItemButton} onClick={() => setIsModalOpen(true)}>
        Add Item
      </button>

      {isModalOpen && (
        <AddItemInStock
          onClose={() => setIsModalOpen(false)}
          onAddItem={handleAddItem}
          categories={defaultCategories}
        />
      )}

      {isEditModalOpen && editItem && (
        <EditItemModal
          item={editItem}
          categories={defaultCategories}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

const EditItemModal = ({ item, categories, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data before submission
    if (!formData.name || !formData.category || formData.inStock < 0) {
      alert("Please fill out all fields with valid values.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.editInput}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.editInput}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>In Stock</label>
            <input
              type="number"
              name="inStock"
              value={formData.inStock}
              onChange={handleChange}
              className={styles.editInput}
              required
            />
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveButton}>Save</button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default StockRegister;
