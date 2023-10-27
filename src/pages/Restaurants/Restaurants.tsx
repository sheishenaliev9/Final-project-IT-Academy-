import React, { useEffect } from "react";
import styles from "./Restaurants.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Loader } from "../../components";
import { IRestaurantType } from "../../types/index.type";
import { getRestaurants } from "../../store/actions/restaurantsActions";

export const Restaurants: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurants } = useAppSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  return (
    <div className={styles.restaurants}>
      <div className="container">
        <div className={styles.restaurants__inner}>
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
  return <div>{item.name}</div>;
};
