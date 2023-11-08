import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router";
import { addToCart, getOneRestaurant } from "../../store";
import { CButton, Loader } from "../../components";
import { ICartActions, IMenuType } from "../../types/index.type";
import { BiCartAdd } from "react-icons/bi";
import { Link } from "react-router-dom";
import styles from "./OneRestaurant.module.scss";

export const OneRestaurant: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((state) => state.restaurants);
  const navigate = useNavigate();
  const { id } = useParams();

  const { name, description, photo_1, address, tables, dishes, drinks } =
    restaurant;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getOneRestaurant(Number(id)));
  }, [dispatch, id]);

  const addToCartFunc = (item: IMenuType, type: string) => {
    const formData = new FormData();
    formData.append("person_id", "17");
    if (id) formData.append("restaurant_id", id.toString());
    formData.append("action", "update");
    if (type === "dish") {
      formData.append("dish_id", item.id.toString());
    } else if (type === "drink") {
      formData.append("drink_id", item.id.toString());
    }

    const token = localStorage.getItem("token");

    if (token === null) return navigate("/registration");

    dispatch(addToCart(formData as ICartActions));
  };

  if (!restaurant || !photo_1 || !dishes || !drinks) return <Loader />;

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
              <p>Описание: {description}</p>
              <p>Адресс: {address}</p>
              <p>Столы: {tables}</p>
              <Link to={`/booking/${id}`}>
                <CButton>Забронировать стол</CButton>
              </Link>
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
                      <MenuItem
                        key={dish.id}
                        item={dish}
                        onAddToCart={() => addToCartFunc(dish, "dish")}
                      />
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
                      <MenuItem
                        key={drink.id}
                        item={drink}
                        onAddToCart={() => addToCartFunc(drink, "drink")}
                      />
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
  item: IMenuType;
  onAddToCart: (item: IMenuType, type: string) => void;
}

export const MenuItem: React.FC<IMenuProps> = ({ item, onAddToCart }) => {
  const { name, photo, made_of, amount, price, type } = item;

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
          <button onClick={() => onAddToCart(item, type.toString())}>
            <BiCartAdd size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};
