import React from "react";
import classes from "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className={classes.Footer}>
      <p>Made with ♥️ by Aastha [copyright {year}]</p>
    </div>
  );
}

export default Footer;
