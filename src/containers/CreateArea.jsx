import React, { useState } from "react";
import classes from "./CreateArea.module.css";

function CreateArea(props) {
  const [entry, setEntry] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setEntry((prevEntry) => {
      return {
        ...prevEntry,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(entry);
    setEntry({
      title: "",
      content: "",
    });
    event.preventDefault();
    console.log("clicked");
  }

  return (
    <div className={classes.CreateArea}>
      <div className={classes.topdiv}>
        <form autoComplete="off">
          <input
            name="title"
            value={entry.title}
            onChange={handleChange}
            placeholder="wanna put a title?"
          />
          <div></div>
          <textarea
            name="content"
            value={entry.content}
            onChange={handleChange}
            placeholder="pour your heart out"
          />
          <button type="button" onClick={submitNote}>
            add
          </button>
        </form>
      </div>
      <hr />
    </div>
  );
}

export default CreateArea;
