import React from "react";
import styles from "./MenuItems.module.scss";
import { BiCartAdd } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IDishType } from "../../types/index.type";

interface IMenuProps {
  item: IDishType;
}

export const DishItem: React.FC<IMenuProps> = ({ item }) => {
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector(state => state.cart);
  const { name, photo, made_of, amount, price, id } = item;
  
  const addToDishes = () => {
      console.log(id)
    //   const updatedDishes = [...cart.dishes, id];
    // dispatch(addToCart({ ...cart, dishes: updatedDishes }));
  };

  // const addToDrinks = () => {
  //   dispatch(addToCart({...cart, drinks: [ id ]}))
  // }

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
          <button onClick={addToDishes}>
            <BiCartAdd />
          </button>
        </div>
      </div>
    </div>
  );
};
