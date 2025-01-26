import React, { useState } from "react";
import styles from "../styles/AddItemInStock.module.css";

const AddItemInStock = ({ onClose, onAddItem, categories }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    category: categories && categories.length > 0 ? categories[0] : "",
    before: 0,
    inStock: 0,
    minStock: 0,
  });

  const handleInputChange = (field, value) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      [field]: field === "name" || field === "category" ? value : parseInt(value) || 0,
    }));
  };

  const handleSubmit = () => {
    if (!newItem.name.trim()) {
      alert("Item name cannot be empty!");
      return;
    }
    if (!newItem.category) {
      alert("Please select a category!");
      return;
    }
    onAddItem(newItem);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Add Item</h2>
        <div className={styles.form}>
          {/* Item Name Input */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Item Name</label>
            <input
              type="text"
              className={styles.input}
              value={newItem.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Item Name"
            />
          </div>

          {/* Category Dropdown */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Category</label>
            <select
              className={styles.input}
              value={newItem.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            >
              {categories && categories.length > 0 ? (
                categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))
              ) : (
                <option value="">No Categories Available</option>
              )}
            </select>
          </div>

          {/* Numeric Inputs for Stock Information */}
          <div className={styles.stockGroup}>
            <div className={styles.inputSubGroup}>
              <label className={styles.label}>Before</label>
              <input
                type="number"
                className={styles.input}
                value={newItem.before}
                onChange={(e) => handleInputChange("before", e.target.value)}
                placeholder="Before"
                min="0"
              />
            </div>
            <div className={styles.inputSubGroup}>
              <label className={styles.label}>In Stock</label>
              <input
                type="number"
                className={styles.input}
                value={newItem.inStock}
                onChange={(e) => handleInputChange("inStock", e.target.value)}
                placeholder="In Stock"
                min="0"
              />
            </div>
            <div className={styles.inputSubGroup}>
              <label className={styles.label}>Min Stock</label>
              <input
                type="number"
                className={styles.input}
                value={newItem.minStock}
                onChange={(e) => handleInputChange("minStock", e.target.value)}
                placeholder="Min Stock"
                min="0"
              />
            </div>
          </div>

          {/* Add Item Button */}
          <button className={styles.updateButton} onClick={handleSubmit}>
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemInStock;
