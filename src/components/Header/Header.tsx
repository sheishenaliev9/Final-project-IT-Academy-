import { Link, useNavigate } from "react-router-dom";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { BiCartAlt } from "react-icons/bi";
import styles from "./Header.module.scss";
import React from "react";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");

    if (token) return navigate("/profile");
    else return navigate("/registration");
  };
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <div className="logo">
            <Link to="/">
              <TbToolsKitchen2 />
            </Link>
          </div>

          <nav className={styles.header__nav}>
            <Link to="/booking">Бронирование</Link>
            <Link to="/restaurants">Рестораны</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>

          <div className={styles.header__profile}>
            <Link to="/cart">
              <BiCartAlt />
            </Link>
            <FaUserAlt onClick={handleProfileClick} />
          </div>
        </div>
      </div>
    </header>
  );
};
