import React from "react";
import styles from "./TelegramBot.module.scss";
import { FaTelegram } from "react-icons/fa";
import { motion } from "framer-motion";
import { textAnimation, textAnimationFromLeft } from "../../animation";
import { AiOutlineArrowRight } from "react-icons/ai";

export const TelegramBot: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      className={styles.telegram_bot}
    >
      <motion.div
        variants={textAnimation}
        custom={1}
        className={styles.telegram_bot_icon}
      >
        <FaTelegram />
      </motion.div>

      <div className={styles.telegram_bot_title}>
        <motion.h2 variants={textAnimationFromLeft} custom={1}>
          Телеграм бот
        </motion.h2>
        <motion.p variants={textAnimationFromLeft} custom={2}>
          Подключите наш телеграм бот чтобы получать уведомление о
          забронированном столе!
        </motion.p>
        <motion.a
          variants={textAnimationFromLeft}
          custom={2}
          href="https://t.me/restaurant_for_final_bot"
          target="blank"
        >
          Подключить <AiOutlineArrowRight />
        </motion.a>
      </div>
    </motion.div>
  );
};
