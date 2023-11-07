import { Link, useNavigate } from "react-router-dom";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { BiCartAlt } from "react-icons/bi";
import styles from "./Header.module.scss";
import React, { useEffect, useState } from "react";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");

    if (token) return navigate("/profile");
    else return navigate("/registration");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.onscroll = handleScroll;
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div
        className={`${styles.header__inner} ${
          isScrolled ? styles.scrolledInner : ""
        }`}
      >
        <div className="logo">
          <Link to="/">
            <TbToolsKitchen2 size={32} />
          </Link>
        </div>

        <nav className={styles.header__nav}>
          <Link to="/">Главная</Link>
          <Link to="/restaurants">Рестораны</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>

        <div className={styles.header__profile}>
          <Link to="/cart">
            <BiCartAlt size={26} />
          </Link>
          <FaUserAlt size={23} onClick={handleProfileClick} />
        </div>
      </div>
    </header>
  );
};
