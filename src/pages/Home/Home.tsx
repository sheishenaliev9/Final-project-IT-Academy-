import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import foodImg from "../../assets/foodImg.svg";
import tableImg from "../../assets/table.svg";
import preorderImg from "../../assets/preorder.svg";
import timeImg from "../../assets/timeImg.svg";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { textAnimation, textAnimationFromLeft } from "../../animation";
import styles from "./Home.module.scss";
import { TelegramBot } from "../../components";

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
  custom: number;
}> = ({ title, text, imageIndex, custom }) => (
  <motion.div initial="hidden" whileInView="visible">
    <motion.img
      custom={custom}
      variants={textAnimation}
      src={imageBlocks[imageIndex].src}
      alt={imageBlocks[imageIndex].alt}
    />
    <motion.h3 custom={custom} variants={textAnimation}>
      {title}
    </motion.h3>
    <motion.p custom={custom} variants={textAnimation}>
      {text}
    </motion.p>
  </motion.div>
);

export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.home}>
      <div className="container">
        <div className={styles.home__inner}>
          <div className={styles.home__title_block}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              className={styles.home__title}
            >
              <motion.h1 custom={1} variants={textAnimation}>
                Бронируйте стол и заказывайте онлайн
              </motion.h1>
              <motion.p custom={2} variants={textAnimation}>
                Для вашего комфорта предлагаем предварительное бронирование
                столиков и предзаказ блюд. Выбери ресторан быстро и удобно!
              </motion.p>
              <Link to="/restaurants">
                <button>
                  Рестораны <AiOutlineArrowRight />
                </button>
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              className={styles.home__image}
            >
              <motion.img
                variants={textAnimationFromLeft}
                custom={2}
                src={foodImg}
                alt="food-image"
              />
            </motion.div>
          </div>

          <TelegramBot />

          <div className={styles.home__about}>
            <HomeBlock
              title="Закажи еду заранее"
              text="Закажи еду заранее и наслаждайся вкусом без ожидания. Удобно, быстро, вкусно!"
              imageIndex={1}
              custom={1}
            />
            <HomeBlock
              title="Забронируй столик онлайн"
              text="Резервируйте свой столик прямо сейчас – делайте ваш вечер особенным!"
              imageIndex={2}
              custom={2}
            />
            <HomeBlock
              title="Все быстро и удобно"
              text="Отличное обслуживание, быстрые заказы и удобная атмосфера. Приходите и наслаждайтесь."
              imageIndex={3}
              custom={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
