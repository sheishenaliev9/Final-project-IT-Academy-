import React, { useEffect } from "react";
import { clearCart, deleteFromCart, getCart } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { CartDishes, CartDrinks, Loader } from "../../components";
import { ICartActions } from "../../types/index.type";
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

    dispatch(clearCart(formData as ICartActions));
  };

  const deleteFromCartFunc = (id: number) => {
    const formData = new FormData();
    formData.append("person_id", "1");
    formData.append("action", "remove");
    formData.append("dish_id", id.toString());

    dispatch(deleteFromCart(formData as ICartActions));
    dispatch(getCart());
  };

  if (!cart) return <Loader />;

  return (
    <div className={styles.cart}>
      <div className="container">
        <div className={styles.cart__inner}>
          <div className={styles.cart__info}>
            <div className={styles.cart__list}>
              <div className={styles.cart__list__title}>
                <h2>Корзина:</h2>
              </div>
              <div className={styles.cart__list__items}>
                <div>
                  <h2>Блюда</h2>
                  {cart &&
                    cart.map((item) =>
                      item.dishes.map((item) => (
                        <CartDishes
                          key={item.id}
                          item={item}
                          onClick={deleteFromCartFunc}
                        />
                      ))
                    )}
                </div>
                <div>
                  <h2>Напитки</h2>
                  {cart &&
                    cart.map((item) =>
                      item.drinks.map((item) => (
                        <CartDrinks
                          key={item.id}
                          item={item}
                          onClick={deleteFromCartFunc}
                        />
                      ))
                    )}
                </div>
              </div>
            </div>

            <div className={styles.cart__info__actions}>
              <h2>Оформление заказа:</h2>
              <div className={styles.cart__actions__btns}>
                <button>Добавить ко столу</button>
                <button onClick={clearCartFunc}>Очистить корзину</button>
              </div>
              <h2>Итого: {cart.map((item) => item.total_price)} с</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
