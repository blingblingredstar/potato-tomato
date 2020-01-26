import React from "react";

import "./Logo.scss";
import svg from "../../static/logo.svg";

const Logo = () => {
  return (
    <div className="logo">
      <span>
        <img src={svg} alt="logo" />
      </span>
      <span>土豆番茄</span>
    </div>
  );
};

export default Logo;
