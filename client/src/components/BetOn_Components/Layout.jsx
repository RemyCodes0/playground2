import React from "react";
import Image from "../../assets/AmeaLogo.svg";
import { Link } from "react-router-dom";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="content">
        <header className="heading">
          <div className="logo">
            <div className="logo-image">
              <img src={Image} />
            </div>
          </div>
        </header>
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};
