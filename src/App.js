import React, { useEffect, useState } from "react";
import Heading from "./components/Heading";
import CreateArea from "./containers/CreateArea";
import Entry from "./components/Entry";
import Footer from "./components/Footer";
import { ToastProvider } from "react-toast-notifications";
import Modal from "react-modal";
import "./modal.css";

function App() {
  const [entries, setEntries] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [entryToBeEdited, setEntryToBeEdited] = useState({});

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    const entryData = localStorage.getItem("my-entries");
    if (entryData) setEntries(JSON.parse(entryData));
  }, []);

  useEffect(() => {
    localStorage.setItem("my-entries", JSON.stringify(entries));
  });

  function addEntry(newNote) {
    setEntries((prevEntries) => {
      return [...prevEntries, newNote];
    });
  }

  function deleteEntry(id) {
    setEntries((prevEntries) => {
      return prevEntries.filter((entryItem, index) => {
        return index !== id;
      });
    });
  }

  function openEditEntryModal(currentEntryToBeEdited) {
    setIsEditModalOpen(true);
    setEntryToBeEdited(currentEntryToBeEdited);
  }

  function saveEditedEntry(editedEntry) {
    let allEntries = entries;
    allEntries[editedEntry.id] = {
      title: editedEntry.title,
      content: editedEntry.content,
      colour: editedEntry.colour,
    };
    setEntries(allEntries);
    setIsEditModalOpen(false);
  }

  return (
    <ToastProvider>
      <Modal isOpen={isEditModalOpen} ariaHideApp={false} style={customStyles}>
        <div
          style={{
            backgroundColor: entryToBeEdited.colour
              ? entryToBeEdited.colour
              : "#ffffff",
          }}
        >
          <div className="modal-inputs">
            <input
              name="title"
              value={entryToBeEdited.title}
              onChange={(event) =>
                setEntryToBeEdited({
                  ...entryToBeEdited,
                  title: event.target.value,
                })
              }
              placeholder="wanna put a title?"
              autoComplete="off"
            />
            <textarea
              name="content"
              value={entryToBeEdited.content}
              onChange={(event) =>
                setEntryToBeEdited({
                  ...entryToBeEdited,
                  content: event.target.value,
                })
              }
              placeholder="pour your heart out"
              autoComplete="off"
            />
          </div>
          <div className="modal-buttons">
            <button onClick={() => setIsEditModalOpen(false)}>close</button>
            <button onClick={() => saveEditedEntry(entryToBeEdited)}>
              save
            </button>
          </div>
        </div>
      </Modal>
      <div>
        <Heading />
        <CreateArea onAdd={addEntry} />
        {entries.map((entryItem, index) => {
          return (
            <Entry
              key={index}
              id={index}
              title={entryItem.title}
              content={entryItem.content}
              colour={entryItem.colour}
              onDelete={deleteEntry}
              onEdit={openEditEntryModal}
            />
          );
        })}
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
