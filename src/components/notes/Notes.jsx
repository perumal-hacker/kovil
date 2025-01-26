import React, { useState, useEffect } from "react";
import axios from "axios";
import { NoteCard } from "./NoteCard";
import { PoojaCard } from "./PoojaCard";
import styles from "./Notes.module.css";

const Notes = () => {
  const [dailyNotes, setDailyNotes] = useState([]);
  const [weeklyPoojas, setWeeklyPoojas] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPoojaPopupOpen, setIsPoojaPopupOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: "",
    date: "",
    content: "",
    notes: "",
    image: null,
    type: "",
  });

  // Fetch Notes and Poojas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/dashboard/notes");
        const notes = response.data.filter((item) => item.type === "note");
        const poojas = response.data.filter((item) => item.type === "pooja");

        setDailyNotes(notes);
        setWeeklyPoojas(poojas);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        alert("Failed to load data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  // Handle Form Changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewEntry((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle Submitting New Entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append the fields to the FormData object
    Object.entries(newEntry).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await axios.post("http://localhost:8080/dashboard/notes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (newEntry.type === "note") {
        setDailyNotes([...dailyNotes, response.data]);
      } else {
        setWeeklyPoojas([...weeklyPoojas, response.data]);
      }

      setIsPopupOpen(false);
      setIsPoojaPopupOpen(false);

      setNewEntry({
        title: "",
        date: "",
        content: "",
        notes: "",
        image: null,
        type: "",
      });
    } catch (error) {
      console.error("Error adding entry:", error.message);
      alert(`Failed to add ${newEntry.type}. Please try again.`);
    }
  };

  // Normalize Date for Consistent Filtering
  const normalizeDate = (date) => new Date(date).toISOString().split("T")[0];

  const filteredDailyNotes = dailyNotes.filter(
    (note) => !selectedDate || normalizeDate(note.date) === selectedDate
  );
  const filteredWeeklyPoojas = weeklyPoojas.filter(
    (pooja) => !selectedDate || normalizeDate(pooja.date) === selectedDate
  );

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <main className={styles.notes}>
      <div className={styles.container}>
        {/* Centered Header */}
        <header className={styles.header}>
          <h1 className={styles.mainHeader}>Notes and Poojas</h1>
          <div className={styles.dateSection}>
            <label className={styles.dateLabel}>
              Filter by Date:
              <input
                className={styles.dateSelector}
                type="date"
                name="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </label>
          </div>
        </header>

        {/* Daily Notes Section */}
        <div className={styles.notesHeader}>
          <h2 className={styles.dailyNotes}>Daily Notes</h2>
          <button
            className={styles.newNoteButton}
            onClick={() => {
              setNewEntry({ title: "", date: "", content: "", image: null, type: "note" });
              setIsPopupOpen(true);
            }}
          >
            <span className={styles.plusIcon}>+</span>
            <span>New Note</span>
          </button>
        </div>

        <section className={styles.dailyNotesGrid}>
          {filteredDailyNotes.length > 0 ? (
            filteredDailyNotes.map((note, index) => <NoteCard key={index} {...note} />)
          ) : (
            <p>No notes available for the selected date.</p>
          )}
        </section>

        {/* Weekly Poojas Section */}
        <section className={styles.poojasSection}>
          <div className={styles.poojaHeader}>
            <h2 className={styles.weeklyPoojasTitle}>Weekly Poojas</h2>
            <button
              className={styles.addPoojaButton}
              onClick={() => {
                setNewEntry({ title: "", date: "", notes: "", image: null, type: "pooja" });
                setIsPoojaPopupOpen(true);
              }}
            >
              <span className={styles.plusIcon}>+</span>
              <span>Add New</span>
            </button>
          </div>
          <div className={styles.poojasGrid}>
            {filteredWeeklyPoojas.length > 0 ? (
              filteredWeeklyPoojas.map((pooja, index) => <PoojaCard key={index} {...pooja} />)
            ) : (
              <p>No poojas available for the selected date.</p>
            )}
          </div>
        </section>
      </div>

      {/* Popup Form */}
      {(isPopupOpen || isPoojaPopupOpen) && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setIsPopupOpen(false);
                setIsPoojaPopupOpen(false);
              }}
            >
              &times;
            </button>
            <h2>{newEntry.type === "note" ? "New Note" : "Add New Pooja"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={newEntry.title}
                  onChange={handleFormChange}
                  placeholder={`Enter ${newEntry.type} title`}
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={newEntry.date}
                  onChange={handleFormChange}
                />
              </label>
              {newEntry.type === "note" ? (
                <label>
                  Content:
                  <textarea
                    name="content"
                    rows="5"
                    value={newEntry.content}
                    onChange={handleFormChange}
                    placeholder="Enter note content"
                  />
                </label>
              ) : (
                <label>
                  Notes:
                  <textarea
                    name="notes"
                    rows="5"
                    value={newEntry.notes}
                    onChange={handleFormChange}
                    placeholder="Enter pooja notes"
                  />
                </label>
              )}
              <label>
                Image:
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </label>
              <button type="submit" className={styles.submitButton}>Save</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Notes;
