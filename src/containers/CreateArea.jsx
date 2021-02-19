import React, { useState } from "react";
import classes from "./CreateArea.module.css";
import { ToastProvider, useToasts } from "react-toast-notifications";

function CreateArea(props) {
  const [entry, setEntry] = useState({ title: "", content: "" });
  const { addToast } = useToasts();

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
    if (entry.content === "" && entry.title === "")
      addToast("Oops! the entry neither has a title nor any content", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1500,
      });
    else {
      props.onAdd(entry);
    }
    setEntry({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <ToastProvider>
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
    </ToastProvider>
  );
}

export default CreateArea;
