import React from "react";
import classes from "./Entry.module.css";

function Entry(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className={classes.Entry}>
      <div className={classes.topdiv}>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={handleClick}>delete</button>
      </div>
    </div>
  );
}

export default Entry;
