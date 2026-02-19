import React from "react";
import "./PrimaryBtn.css";
import { MdArrowOutward } from "react-icons/md";

const PrimaryBtn = ({ priBtnText, variant = "blue" }) => {
  const clr = variant === "blue" ? "var(--blue_color)" : "var(--maroon_color)";

  return (
    <button className={`button_primary ${variant}`} style={{ "--clr": clr }}>
      <span className="button__icon-wrapper">
        <MdArrowOutward className="button__icon-svg" size={18} />
        <MdArrowOutward
          className="button__icon-svg button__icon-svg--copy"
          size={18}
        />
      </span>
      {priBtnText}
    </button>
  );
};

export default PrimaryBtn;
