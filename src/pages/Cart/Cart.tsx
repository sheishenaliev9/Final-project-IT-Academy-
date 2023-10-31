import React, { useEffect } from "react";
import { clearCart, deleteFromCart, getCart } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Loader } from "../../components";
import { ICartType } from "../../types/index.type";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./Cart.module.scss";

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const clearCartFunc = () => {
    const formData = new FormData();
    formData.append("person_id", "1");
    formData.append("action", "clear");

    dispatch(clearCart(formData));
  };

  const deleteFromCartFunc = (id: number) => {
    const formData = new FormData();
    formData.append("person_id", "1");
    formData.append("action", "remove");
    formData.append("dish_id", id.toString());

    dispatch(deleteFromCart(formData));
    dispatch(getCart());
  };

  return (
    <div className={styles.cart}>
      <div className="container">
        <div className={styles.cart__inner}>
          <div className={styles.cart__info}>
            <div className={styles.cart__list}>
              <div className={styles.cart__list__title}>
                <h2>Корзина:</h2>
              </div>
              {cart ? (
                cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onClick={deleteFromCartFunc}
                  />
                ))
              ) : (
                <Loader />
              )}
            </div>

            <div>
              <button onClick={clearCartFunc}>Очистить корзину</button>
              <h2>{cart.map((item) => item.total_price)} с</h2>
              <form></form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ICartProps {
  item: ICartType;
  onClick: (id: number) => void;
}

export const CartItem: React.FC<ICartProps> = ({ item, onClick }) => {
  const { dishes } = item;

  return (
    <div className={styles.cart_items}>
      {dishes.map((item) => (
        <div key={item.id} className={styles.cart_item__info}>
          <div className={styles.cart_item__title}>
            <img src={item.photo} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>
                <span>Состав:</span> {item.made_of}
              </p>
              <p>{item.price} с</p>
            </div>
          </div>

          <div className={styles.cart_item__actions}>
            <button onClick={() => onClick(item.id)}>
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
