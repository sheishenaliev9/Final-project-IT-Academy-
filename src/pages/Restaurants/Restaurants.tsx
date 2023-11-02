import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Loader } from "../../components";
import { IRestaurantType } from "../../types/index.type";
import { getRestaurants } from "../../store/actions/restaurantsActions";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./Restaurants.module.scss";

export const Restaurants: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurants } = useAppSelector((state) => state.restaurants);

  console.log(restaurants)

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  return (
    <div className={styles.restaurants}>
      <div className="container">
        <div className={styles.restaurants__inner}>
          <div className={styles.restaurants__title}>
            <h1>Все рестораны</h1>
            <p>Выбери ресторан и забронируй столик!</p>
          </div>
          <div className={styles.restaurants__list}>
            {restaurants ? (
              restaurants.map((restaurant) => (
                <RestaurantItem key={restaurant.id} item={restaurant} />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface IRestaurantItemProps {
  item: IRestaurantType;
}

export const RestaurantItem: React.FC<IRestaurantItemProps> = ({ item }) => {
  const { name, photo_1, description, address, tables, id } = item;
  return (
    <div className={styles.restaurant}>
      <div className={styles.restaurant__info}>
        <div className={styles.info__image}>
          <img src={photo_1} alt={name} />
        </div>
        <div className={styles.info__title}>
          <h3>{name}</h3>
          <p>
            Описание: <span>{description}</span>
          </p>
          <p>
            Адресс: <span>{address}</span>
          </p>
          <p>
            Кол-во столов: <span>{tables}</span>
          </p>
          <Link to={`/restaurants/${id}`}>
            Перейти <AiOutlineArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
