import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router";
import { getOneRestaurant } from "../../store";
import { DishItem, Loader } from "../../components";

import styles from "./OneRestaurant.module.scss";

export const OneRestaurant: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((state) => state.restaurants);
  const { id } = useParams();

  const { name, description, photo_1, address, tables, dishes } =
    restaurant;

  useEffect(() => {
    dispatch(getOneRestaurant(Number(id)));
  }, [dispatch, id]);

  return (
    <div className={styles.restaurant}>
      <div className="container">
        <div className={styles.restaurant__inner}>
          <h1>Узнайте подробнее о ресторане</h1>
          <div className={styles.restaurant__info}>
            <div className={styles.info__image}>
              <img src={photo_1} alt={name} />
            </div>

            <div className={styles.info__title}>
              <h2>{name}</h2>
              <p>{description}</p>
              <p>{address}</p>
              <p>{tables}</p>
            </div>
          </div>

          <div className={styles.restaurant__menu}>
            <div className={styles.menu__title}>
              <h2>Меню</h2>
            </div>

            <div className={styles.restaurant__menu_block}>
              <div className={styles.menu__list}>
                <div className={styles.menu__list__title}>
                  <h3>Блюда</h3>
                </div>
                <div className={styles.menu__list__items}>
                  {dishes ? (
                    dishes.map((dish) => <DishItem key={dish.id} item={dish} />)
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>

              <div className={styles.menu__list}>
                <div className={styles.menu__list__title}>
                  <h3>Напитки</h3>
                </div>
                <div className={styles.menu__list__items}>
                  {/* {drinks ? (
                    drinks.map((drink) => (
                      <MenuItem key={drink.id} item={drink} />
                    ))
                  ) : (
                    <Loader />
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
