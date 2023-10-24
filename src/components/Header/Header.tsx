import { Link } from "react-router-dom";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import styles from "./Header.module.scss";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <div className="logo">
            <TbToolsKitchen2 />
          </div>

          <nav className={styles.header__nav}>
            <Link to="/booking">Бронирование</Link>
            <Link to="/menu">Меню</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>

          <div className={styles.header__profile}>
            <FaUserAlt />
          </div>
        </div>
      </div>
    </header>
  );
};
