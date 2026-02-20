import React from "react";
import "./ActionButton.css";
import { NavLink } from "react-router-dom";

const ActionButton = ({
  text,
  to,
  variant = "solid",
  color = "blue",
  className = "",
  onClick,
}) => {
  const buttonClass = `btn ${variant} ${color} ${className}`;

  if (to) {
    return (
      <NavLink to={to} className={buttonClass} onClick={onClick}>
        {text}
      </NavLink>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default ActionButton;
