import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router";
import { getOneRestaurant, addToCartAction } from "../../store";
import { Loader } from "../../components";

import styles from "./OneRestaurant.module.scss";
import { IDishType } from "../../types/index.type";
import { BiCartAdd } from "react-icons/bi";

export const OneRestaurant: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((state) => state.restaurants);
  const { cart } = useAppSelector((state) => state.cart);
  const { id } = useParams();

  console.log(cart);

  const { name, description, photo_1, address, tables, dishes, drinks } = restaurant;

  const addToCart = (id: number, type: string) => {
    dispatch(
      addToCartAction({ item: { id, type }, restaurant_id: restaurant.id })
    );
  };

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
                    dishes.map((dish) => (
                      <MenuItem key={dish.id} item={dish} onClick={addToCart} />
                    ))
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
                  {drinks ? (
                    drinks.map((drink) => (
                      <MenuItem key={drink.id} item={drink} onClick={addToCart} />
                    ))
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


interface IMenuProps {
  item: IDishType;
  onClick: (id: number, type: string) => void;
}

export const MenuItem: React.FC<IMenuProps> = ({ item, onClick }) => {
  const { name, photo, made_of, amount, price, id } = item;
  

  return (
    <div className={styles.item}>
      <div className={styles.item__image}>
        <img src={photo} alt={name} />
      </div>
      <div className={styles.item__title}>
        <h3>{name}</h3>
        <p>{made_of}</p>
      </div>
      <div className={styles.item__subtitle}>
        <p>{amount}</p>
        <div className={styles.item__actions}>
          <p>{price} с</p>
          <button onClick={() => onClick(id, "dishes")}>
            <BiCartAdd />
          </button>
        </div>
      </div>
    </div>
  );
};

