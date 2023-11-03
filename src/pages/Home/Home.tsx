import React from "react";
import { Link } from "react-router-dom";
import foodImg from "../../assets/foodImg.svg";
import tableImg from "../../assets/table.svg";
import preorderImg from "../../assets/preorder.svg";
import timeImg from "../../assets/timeImg.svg";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./Home.module.scss";

const imageBlocks = [
  { src: foodImg, alt: "food-image" },
  { src: preorderImg, alt: "preorder" },
  { src: tableImg, alt: "table" },
  { src: timeImg, alt: "time" },
];

const HomeBlock: React.FC<{
  title: string;
  text: string;
  imageIndex: number;
}> = ({ title, text, imageIndex }) => (
  <div>
    <img src={imageBlocks[imageIndex].src} alt={imageBlocks[imageIndex].alt} />
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

export const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className="container">
        <div className={styles.home__inner}>
          <div className={styles.home__title_block}>
            <div className={styles.home__title}>
              <h1>Бронируйте стол и заказывайте онлайн</h1>
              <p>
                Для вашего комфорта предлагаем предварительное бронирование
                столиков и предзаказ блюд. Выбери ресторан быстро и удобно!
              </p>
              <Link to="/restaurants">
                <button>
                  Рестораны <AiOutlineArrowRight />
                </button>
              </Link>
            </div>
            <div className={styles.home__image}>
              <img src={foodImg} alt="food-image" />
            </div>
          </div>
          <div className={styles.home__about}>
            <HomeBlock
              title="Закажи еду заранее"
              text="Закажи еду заранее и наслаждайся вкусом без ожидания. Удобно, быстро, вкусно!"
              imageIndex={1}
            />
            <HomeBlock
              title="Забронируй столик онлайн"
              text="Резервируйте свой столик прямо сейчас – делайте ваш вечер особенным!"
              imageIndex={2}
            />
            <HomeBlock
              title="Все быстро и удобно"
              text="Отличное обслуживание, быстрые заказы и удобная атмосфера. Приходите и наслаждайтесь."
              imageIndex={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
