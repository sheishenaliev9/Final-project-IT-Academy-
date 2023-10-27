import React, { useEffect } from "react";
import styles from "./OneRestaurant.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router";
import { getOneRestaurant } from "../../store";

export const OneRestaurant: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector(state => state.restaurants);
  const { id } = useParams();

  const { name, description, photo_1, address } = restaurant;
  useEffect(() => {
    dispatch(getOneRestaurant(Number(id)));
  }, [dispatch, id]);

  return (
    <div className={styles.restaurant}>
      <div className="container">
        <div className={styles.restaurant__inner}>
          <div className={styles.restaurant__info}>

              <div className={styles.info__image}>
                <img src={photo_1} alt={name} />
              </div>

              <div className={styles.info__title}>
                <h2>{name}</h2>
                <p>{description}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
