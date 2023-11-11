import React, { useEffect } from "react";
import { clearCart, deleteFromCart, getCart } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { CartDishes, CartDrinks, Loader } from "../../components";
import { ICartActions } from "../../types/index.type";
import { MdNoDrinks, MdNoFood } from "react-icons/md";
import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const clearCartFunc = () => {
    const formData = new FormData();
    formData.append("person_id", "17");
    formData.append("action", "clear");

    dispatch(clearCart(formData as ICartActions));
  };

  const deleteFromCartFunc = (id: number, itemType: "dish" | "drink") => {
    const formData = new FormData();
    formData.append("person_id", "17");
    formData.append("action", "remove");
    formData.append(`${itemType}_id`, id.toString());

    dispatch(deleteFromCart(formData as ICartActions));
  };

  if (!cart || !Array.isArray(cart)) {
    return <Loader />;
  }

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
                  <h2>Блюда:</h2>
                  {cart.map((item) =>
                    item.dishes &&
                    Array.isArray(item.dishes) &&
                    item.dishes.length > 0 ? (
                      item.dishes.map((dishItem) => (
                        <CartDishes
                          key={dishItem.id}
                          item={dishItem}
                          onClick={(id) => deleteFromCartFunc(id, "dish")}
                        />
                      ))
                    ) : (
                      <div className={styles.noFood}>
                        <h2>В корзине нет блюд</h2>
                        <MdNoFood />
                      </div>
                    )
                  )}
                </div>
                <div>
                  <h2>Напитки:</h2>
                  {cart.map((item) =>
                    item.drinks &&
                    Array.isArray(item.drinks) &&
                    item.drinks.length > 0 ? (
                      item.drinks.map((drinkItem) => (
                        <CartDrinks
                          key={drinkItem.id}
                          item={drinkItem}
                          onClick={(id) => deleteFromCartFunc(id, "drink")}
                        />
                      ))
                    ) : (
                      <div className={styles.noFood}>
                        <h2>В корзине нет напитков</h2>
                        <MdNoDrinks />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className={styles.cart__info__actions}>
              <h2>Оформление заказа:</h2>
              <h2>
                Итого:{" "}
                {cart.length > 0
                  ? `${cart
                      .map((item) => item.total_price)
                      .reduce((acc, val) => acc + val, 0)} с`
                  : "0 с"}
              </h2>
              <div className={styles.cart__actions__btns}>
                <button onClick={clearCartFunc}>Очистить корзину</button>
                <button>
                  <Link to="/payment">Оплатить</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
