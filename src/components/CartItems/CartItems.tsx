import React from "react";
import { IMenuType } from "../../types/index.type";
import styles from "./CartItems.module.scss";
import { MdDeleteOutline } from "react-icons/md";

interface ICartProps {
  item: IMenuType;
  onClick: (id: number, itemType: "dish" | "drink") => void;
}

export const CartDishes: React.FC<ICartProps> = ({ item, onClick }) => {
  console.log(item);
  return (
    <div className={styles.cart_item}>
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
          <button onClick={() => onClick(item.id, "dish")}>
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export const CartDrinks: React.FC<ICartProps> = ({ item, onClick }) => {
  return (
    <div className={styles.cart_item}>
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
          <button onClick={() => onClick(item.id, "drink")}>
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};
