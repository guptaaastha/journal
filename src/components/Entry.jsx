import React from "react";
import classes from "./Entry.module.css";

function Entry(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    const currentEntry = {
      title: props.title,
      content: props.content,
      colour: props.colour,
      id: props.id,
    };
    props.onEdit(currentEntry);
  }

  return (
    <div className={classes.Entry}>
      <div className={classes.topdiv} style={{ backgroundColor: props.colour }}>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <div className={classes.buttons}>
          <button onClick={handleEdit}>edit</button>
          <button onClick={handleDelete}>delete</button>
        </div>
      </div>
    </div>
  );
}

export default Entry;
