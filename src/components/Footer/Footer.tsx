import React from "react";
import { TbToolsKitchen2 } from "react-icons/tb";
import { AiTwotonePhone, AiFillInstagram } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.footer__inner}>
          <div className={styles.footer__logo}>
            <div className="logo">
              <TbToolsKitchen2 />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              ex rerum, provident distinctio magnam culpa.
            </p>
          </div>

          <div className={styles.footer__contacts}>
            <h3>Наши контакты</h3>
            <ul className={styles.contacts__list}>
              <li>
                <a href="#">
                  <AiTwotonePhone /> +996-999-999
                </a>
              </li>
              <li>
                <a href="#">
                  <AiFillInstagram /> instagram
                </a>
              </li>
              <li>
                <a href="#">
                  <BsTelegram /> telegram
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.footer__questions}>
            <h3>Возникли вопросы?</h3>
            <p>Напишите нам на почту</p>
            <a href="#">example@gmail.com</a>
          </div>
        </div>
      </div>

      <div id="footer" className={styles.footer__under}>
        <div className="container">
          <div className={styles.under__inner}>
            <div className="logo">
              <TbToolsKitchen2 />
            </div>
            <p>© 2023 Resto, Inc.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
