import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Loader } from "../../components";
import { getCart } from "../../store";
import { ICartType } from "../../types/index.type";

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  return (
    <div className={styles.cart}>
      <div className="container">
        <div className={styles.cart__inner}>
          <div className={styles.cart__info}>
            <div className={styles.cart__info__title}>
              <h2>Корзина:</h2>
            </div>
            <div className={styles.cart__list}>
              {cart ? (
                cart.map((item) => <CartItem key={item.id} item={item} />)
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ICartProps {
  item: ICartType;
}

export const CartItem: React.FC<ICartProps> = ({ item }) => {
  const { dishes } = item;

  return (
    <div className={styles.cart_item}>
      {dishes.map((item) => (
        <div className={styles.cart_item__info}>
          <div className={styles.cart_item__img}>
            <img src={item.photo} alt={item.name} />
          </div>
          <div className={styles.cart_item__title}>
            <h3>{item.name}</h3>
            <p>
              <span>Состав:</span> {item.made_of}
            </p>
            <p>{item.price} с</p>
          </div>
        </div>
      ))}
    </div>
  );
};
