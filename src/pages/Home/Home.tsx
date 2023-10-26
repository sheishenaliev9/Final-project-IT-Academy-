import React from "react";
import { Link } from "react-router-dom";
import foodImg from "../../assets/foodImg.svg";
import tableImg from "../../assets/table.svg";
import preorderImg from "../../assets/preorder.svg";
import timeImg from "../../assets/timeImg.svg";
import styles from "./Home.module.scss";


export const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className="container">
        <div className={styles.home__inner}>
          <div className={styles.home__title_block}>
            <div className={styles.home__block_title}>
              <h1>Бронируйте стол и заказывайте онлайн</h1>
              <p>
                Для вашего комфорта предлагаем предварительное бронирование
                столиков и предзаказ блюд. Приглашаем вас на вкусный вечер в
                нашем ресторане!
              </p>

              <Link to="/booking">
                <button>Забронировать</button>
              </Link>
            </div>

            <div className={styles.home__image}>
              <img src={foodImg} alt="food-image" />
            </div>
          </div>

          <div className={styles.home__about}>
            <div>
              <img src={preorderImg} alt="preoder" />
              <h3>Закажи еду заранее</h3>
              <p>Закажи еду заранее и наслаждайся вкусом без ожидания. Удобно, быстро, вкусно!</p>
            </div>

            <div>
              <img src={tableImg} alt="table" />
              <h3>Забронируй столик онлайн</h3>
              <p>Резервируйте свой столик прямо сейчас – делайте ваш вечер особенным!</p>
            </div>

            <div>
              <img src={timeImg} alt="time" />
              <h3>Все быстро и удобно</h3>
              <p>Отличное обслуживание, быстрые заказы и удобная атмосфера. Приходите и наслаждайтесь.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
