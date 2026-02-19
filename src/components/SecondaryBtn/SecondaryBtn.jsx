import React from "react";
import "./SecondaryBtn.css";
import { MdArrowOutward } from "react-icons/md";

const SecondaryBtn = ({ secBtnText, variant = "white" }) => {
  // Define default colors based on variants
  // For white variant: Button BG = white, Text = black, Icon = white, Icon BG = black/blue
  let btnStyle = {
    "--btn-bg": "var(--white_color)",
    "--btn-text": "var(--black_color)",
    "--icon-bg": "var(--blue_color)",
    "--icon-color": "var(--white_color)",
  };

  if (variant === "maroon") {
    btnStyle = {
      "--btn-bg": "var(--maroon_color)",
      "--btn-text": "var(--white_color)",
      "--icon-bg": "var(--white_color)",
      "--icon-color": "var(--maroon_color)",
    };
  } else if (variant === "white-maroon") {
    btnStyle = {
      "--btn-bg": "var(--white_color)",
      "--btn-text": "var(--black_color)",
      "--icon-bg": "var(--maroon_color)",
      "--icon-color": "var(--white_color)",
    };
  }

  return (
    <button className={`secondary_button ${variant}`} style={btnStyle}>
      {secBtnText}
      <span className="secondary_button_icon_wrapper">
        <MdArrowOutward className="secondary_button_icon" size={18} />
        <MdArrowOutward
          className="secondary_button_icon secondary_button_icon_copy"
          size={18}
        />
      </span>
    </button>
  );
};

export default SecondaryBtn;
