import React from "react";
import { IChildren } from "../../lib/types/MainPage";

const Button = ({ children, onClick }: IChildren) => {
  return (
    <button className="btn__cta" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
