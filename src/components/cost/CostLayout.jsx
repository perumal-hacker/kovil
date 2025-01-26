import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CostLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function CostLayout() {
  const [costData, setCostData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    // Fetch costs from backend on component mount
    axios.get("http://localhost:8080/costs")
      .then((response) => {
        // Sort data by date (descending order)
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setCostData(sortedData);
      })
      .catch((err) => console.error("Error fetching costs:", err));
  }, []);

  const handleAddItemFields = (num) => {
    setNumberOfItems(num);
    const newItems = Array.from({ length: num }, (_, i) => ({
      id: i,
      name: "",
      quantity: "",
      cost: "",
    }));
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSave = () => {
    if (!date) {
      alert("Please fill in the date field.");
      return;
    }

    for (const item of items) {
      if (!item.name || !item.quantity || !item.cost) {
        alert("Please fill in all fields for each item.");
        return;
      }
    }

    const newCostData = {
      date,
      total: items.reduce((sum, item) => sum + Number(item.cost), 0),
      items: items.map(({ id, ...rest }) => rest), // Remove `id` field
    };

    // Send data to backend
    axios
      .post("http://localhost:8080/costs", newCostData)
      .then((response) => {
        setCostData((prev) => [...prev, response.data]);
        closePopup();
      })
      .catch((err) => console.error("Error saving cost:", err));
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setNumberOfItems(0);
    setItems([]);
    setDate("");
  };

  const groupByDate = (data) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayData = [];
    const yesterdayData = [];
    const olderData = [];

    data.forEach((section) => {
      const costDate = new Date(section.date);
      
      if (costDate.toDateString() === today.toDateString()) {
        todayData.push(section);
      } else if (costDate.toDateString() === yesterday.toDateString()) {
        yesterdayData.push(section);
      } else {
        olderData.push(section);
      }
    });

    return { todayData, yesterdayData, olderData };
  };

  // Group and filter the data
  const { todayData, yesterdayData, olderData } = groupByDate(costData);

  const filteredData = [...todayData, ...yesterdayData, ...olderData].filter((section) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      section.date.toLowerCase().includes(searchLower) ||
      section.items.some((item) =>
        item.name.toLowerCase().includes(searchLower)
      )
    );
  });

  // Get today's date and set the max value for the date input
  const today = new Date().toISOString().split('T')[0];

  return (
    <main className={styles.costLayout}>
      <header className={styles.header}>
        <span className={styles.adminText}>Administrator</span>
        <FontAwesomeIcon icon={faUserCircle} className={styles.userIcon} />
      </header>

      <h1 className={styles.pageTitle}>Cost</h1>

      <div className={styles.searchBar}>
        <button
          className={styles.newCostBtn}
          onClick={() => setIsPopupOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add New Cost</span>
        </button>
        <div className={styles.searchInput}>
          <FontAwesomeIcon icon={faSearch} className={styles.icon} />
          <input
            type="text"
            placeholder="Search by item or date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredData.map((section, index) => (
        <div key={index} className={styles.costSection}>
          <h2>{section.date}</h2>
          <table className={styles.costTable}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {section.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.cost}</td> {/* Display cost instead of amount */}
                </tr>
              ))}
              <tr className={styles.totalRow}>
                <td>Total</td>
                <td></td>
                <td>{section.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2 className={styles.popupTitle}>Add Cost</h2>
            <label className={styles.popupLabel}>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  if (selectedDate > new Date()) {
                    alert("You can only select today or previous dates.");
                  } else {
                    setDate(e.target.value);
                  }
                }}
                max={today} // Prevent future dates
              />
            </label>
            <label className={styles.popupLabel}>
              Number of Items:
              <input
                type="number"
                min="1"
                max="5"
                value={numberOfItems}
                onChange={(e) => {
                  const value = Math.min(5, Number(e.target.value)); // Limit to 5
                  handleAddItemFields(value);
                }}
              />
            </label>
            {items.map((item, index) => (
              <div key={index} className={styles.itemRow}>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Cost"
                  value={item.cost}
                  onChange={(e) =>
                    handleItemChange(index, "cost", e.target.value)
                  }
                />
              </div>
            ))}
            <div className={styles.popupActions}>
              <button onClick={closePopup} className={styles.closeBtn}>
                Cancel
              </button>
              <button onClick={handleSave} className={styles.saveBtn}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CostLayout;
