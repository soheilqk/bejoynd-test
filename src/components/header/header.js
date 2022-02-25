import React from "react";
import styles from "./header.module.css";

const Header = ({ title, subTitle, leftItem, rightItem }) => {
  return (
    <div className={styles.Header}>
      <p className={styles.Title}>{title}</p>
      <p className={styles.SubTitle}>{subTitle}</p>
      <div className={styles.RightItem}>{rightItem}</div>
      <div className={styles.LeftItem}>{leftItem}</div>
    </div>
  );
};

export default Header;
