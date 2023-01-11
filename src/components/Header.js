import React from "react";
import styles from "./Header.module.scss";
import logo from "../assets/images/logo.jpg";

const Header = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <div ml={2}>
            <span className={styles.title}>HealthLife</span>
            <span className={styles.slogan}>Green Generation</span>
          </div>
        </div>
        <div className={styles.navelements}>
          <span>About</span>
          <span>Services</span>
          <span>Inspect</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
