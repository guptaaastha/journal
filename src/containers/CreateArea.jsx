import React, { useState } from "react";
import classes from "./CreateArea.module.css";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { BlockPicker } from "react-color";

function CreateArea(props) {
  const [entry, setEntry] = useState({ title: "", content: "" });
  const { addToast } = useToasts();
  const [color, setColor] = useState();
  const [pickerVisible, setPickerVisible] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setEntry((prevEntry) => {
      return {
        ...prevEntry,
        [name]: value,
      };
    });
  }

  function submitNote() {
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
  }

  return (
    <ToastProvider>
      <div className={classes.CreateArea}>
        <div
          className={classes.topdiv}
          style={{ backgroundColor: color ? color.hex : "#ffffff" }}
        >
          <input
            name="title"
            value={entry.title}
            onChange={handleChange}
            placeholder="wanna put a title?"
            style={{ backgroundColor: color ? color.hex : "#ffffff" }}
          />
          <textarea
            name="content"
            value={entry.content}
            onChange={handleChange}
            placeholder="pour your heart out"
            style={{
              backgroundColor: color ? color.hex : "#ffffff",
              marginTop: 25,
            }}
          />
          {pickerVisible && (
            <div
              style={{
                position: "absolute",
              }}
            >
              <BlockPicker
                color={color}
                onChangeComplete={(c) => {
                  setColor(c);
                  setPickerVisible(false);
                }}
              />
            </div>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: 0,
              margin: 0,
            }}
          >
            <p
              style={{ margin: 0, padding: 0, fontSize: 20, cursor: "pointer" }}
              onClick={() => setPickerVisible(!pickerVisible)}
            >
              ✏️
            </p>
            <button
              onClick={() => {
                submitNote();
                setPickerVisible(false);
              }}
            >
              +
            </button>
          </div>
        </div>
        <hr />
      </div>
    </ToastProvider>
  );
}

export default CreateArea;
