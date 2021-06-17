import React, { useState } from "react";
import classes from "./CreateArea.module.css";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { BlockPicker } from "react-color";

function CreateArea(props) {
  const [entry, setEntry] = useState({
    title: "",
    content: "",
    colour: "#ffffff",
  });
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
      colour: "#ffffff",
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
            autoComplete="off"
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
            autoComplete="off"
          />
          {pickerVisible && (
            <div style={{ position: "absolute" }}>
              <BlockPicker
                color={color}
                onChangeComplete={(c) => {
                  setColor(c);
                  setPickerVisible(false);
                  setEntry((prevEntry) => {
                    return {
                      ...prevEntry,
                      colour: c.hex,
                    };
                  });
                }}
              />
            </div>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 0,
              margin: 0,
            }}
          >
            <button onClick={() => setPickerVisible(!pickerVisible)}>
              /pick-color
            </button>
            <button
              onClick={() => {
                submitNote();
                setPickerVisible(false);
                setColor({ color: { hex: "#ffffff" } });
              }}
            >
              add
            </button>
          </div>
        </div>
        <hr />
      </div>
    </ToastProvider>
  );
}

export default CreateArea;
