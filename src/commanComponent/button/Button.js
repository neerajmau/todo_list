import React from "react";
import style from "./button.module.css";
const Button = ({ children, onClick, type }) => {
  switch (type) {
    case "add":
      return (
        <button className={style.btn_add} onClick={onClick}>
          {children}
        </button>
      );
    case "clear":
      return (
        <button className={style.btn_clear} onClick={onClick}>
          {children}
        </button>
      );
    default:
      return;
  }
};

export default Button;
