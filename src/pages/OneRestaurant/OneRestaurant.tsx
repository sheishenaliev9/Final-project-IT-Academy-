import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router";
import {
  addReview,
  addToCart,
  deleteReview,
  getOneRestaurant,
  getUserInfo,
} from "../../store";
import { CButton, CInput, Loader } from "../../components";
import {
  ICartActions,
  IMenuType,
  IReviewInfoType,
  IReviewType,
} from "../../types/index.type";
import { BiCartAdd } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./OneRestaurant.module.scss";

export const OneRestaurant: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((state) => state.restaurants);
  const { userInfo } = useAppSelector((state) => state.users);
  const { register, handleSubmit } = useForm<IReviewType>();

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    name,
    description,
    photo_1,
    address,
    tables,
    dishes,
    drinks,
    reviews,
  } = restaurant;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getOneRestaurant(Number(id)));
    dispatch(getUserInfo());
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

  const addReviewFunc = (values: IReviewType) => {
    const newRewiew: IReviewType = {
      ...values,
      person: userInfo.id,
      positive_or_not: "positive",
      restaurant: restaurant.id,
    };
    dispatch(addReview(newRewiew));
    dispatch(getOneRestaurant(Number(id)));
  };

  if (!restaurant || !photo_1 || !dishes || !drinks) return <Loader />;

  return (
    <div className={styles.restaurant}>
      <div className="container">
        <div className={styles.restaurant__inner}>
          <h1 className={styles.restairant__title}>
            Узнайте подробнее о ресторане
          </h1>
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
          <div className={styles.restaurant_reviews}>
            <div className={styles.reviews__title}>
              <h2>Отзывы ресторана</h2>
              <p>
                Здесь вы можете прочитать отзывы ресторана а так же можете
                добавить свой отзыв
              </p>
            </div>
            <div className={styles.reviews__list}>
              {reviews.map((review) => (
                <ReviewItem key={review.created_at} review={review} />
              ))}
            </div>

            <div className={styles.reviews_form}>
              <h2>Оставьте свой отзыв!</h2>
              <form onSubmit={handleSubmit(addReviewFunc)}>
                <CInput
                  type="text"
                  placeholder="Введите заголовок"
                  {...register("title", { required: true })}
                />
                <textarea
                  placeholder="Введите отзыв"
                  {...register("content", { required: true })}
                />
                <CButton type="submit">Добавить</CButton>
              </form>
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

interface IReviewItemProps {
  review: IReviewInfoType;
}

export const ReviewItem: React.FC<IReviewItemProps> = ({ review }) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.users);
  const { restaurant } = useAppSelector((state) => state.restaurants);
  const { person, title, content, id } = review;
  const { name, email } = person;

  const dateTimeString = `${review.created_at}`;
  const dateTime = new Date(dateTimeString);

  const date = dateTime.toISOString().split("T")[0];

  const hours = dateTime.getHours().toString();
  const minutes = dateTime.getMinutes().toString();

  const time = `${hours}:${minutes}`;

  const deleteReviewFunc = () => {
    dispatch(deleteReview({ id, restaurant_id: restaurant.id }));
  };

  return (
    <div className={styles.review}>
      <div className={styles.review__info}>
        <div className={styles.review__userInfo}>
          <h2 className={styles.review__name}>{name}</h2>
          <h2>{email}</h2>
        </div>
        <div className={styles.review__body}>
          <h3>
            Заголовок: <span>{title}</span>
          </h3>
          <p>
            Отзыв: <span>{content}</span>
          </p>
        </div>
        <div className={styles.review_created_at}>
          <p>
            Дата: <span>{date}</span>
          </p>
          <p>
            Время: <span>{time}</span>
          </p>
        </div>
      </div>

      <div className={styles.review__actions}>
        {userInfo.id === person.id && (
          <button onClick={deleteReviewFunc}>
            <MdDeleteOutline />
          </button>
        )}
      </div>
    </div>
  );
};
