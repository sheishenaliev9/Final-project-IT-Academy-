import React, { useEffect } from "react";
import styles from "./DishMenu.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getDishes } from "../../store";
import { IDishType } from "../../types/index.type";

export const DishMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dishes } = useAppSelector((state) => state.dishes);

  useEffect(() => {
    dispatch(getDishes());
  }, [dispatch]);

  return (
    <div className={styles.dish_menu}>
      <div className="container">
        <div className={styles.dish_menu__title}>
          <h1>Все блюда из ресторана</h1>
          <p>Выбери и закажи еду заранее</p>
        </div>

        <div className={styles.dish_menu__list}>
          {dishes ? (
            dishes.map((dish) => <DishItem key={dish.id} dish={dish} />)
          ) : (
            <p>404</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface IDishItemProps {
  dish: IDishType;
}

export const DishItem: React.FC<IDishItemProps> = ({ dish }) => {
  const { name, photo, made_of, price } = dish;

  return (
    <div className={styles.dish}>
      <div className={styles.dish__image}>
        <img src={photo} alt={name} />
      </div>
      <div className={styles.dish__title}>
        <h3>{name}</h3>
        <p>{made_of}</p>
        <p>${price}</p>
      </div>
    </div>
  );
};
