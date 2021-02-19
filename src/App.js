import React, { useEffect, useState } from "react";
import Heading from "./components/Heading";
import CreateArea from "./containers/CreateArea";
import Entry from "./components/Entry";
import Footer from "./components/Footer";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const [entries, setEntries] = useState([]);

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

  return (
    <ToastProvider>
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
              onDelete={deleteEntry}
            />
          );
        })}
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
