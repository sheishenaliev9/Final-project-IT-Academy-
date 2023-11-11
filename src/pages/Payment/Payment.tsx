import React, { useEffect, useState } from "react";
import styles from "./Payment.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import axios from "axios";
import { clearCart, getCart } from "../../store";
import { CButton, CInput } from "../../components";
import { ICartActions } from "../../types/index.type";
import { toast } from "react-toastify";

export const Payment: React.FC = () => {
  const { total_price } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [payment_id, setPayment_id] = useState<string>("");

  console.log(payment_id);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const pay = async () => {
    try {
      if (!selectedPaymentMethod) {
        toast.error("Выберите метод оплаты")
        return;
      }

      const paymentMethodId =
        selectedPaymentMethod === "VISA"
          ? "pm_card_visa"
          : "pm_card_mastercard";

      const { data } = await axios.post(
        `https://restaurant--xrisent.repl.co/api/v1/payment/create_payment/`,
        { amount: total_price, payment_method_id: paymentMethodId }
      );
      console.log(data.payment_intent_id);
      setPayment_id(data.payment_intent_id);

      const userConfirmed = window.confirm("Подтвердите оплату");
      if (userConfirmed) {
        confirmPayment(payment_id);
        toast.success("Вы успешно оплатили!");
        dispatch(getCart());
      } else {
        cancelPayment(payment_id);
        toast.success("Оплата отменена.")
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса оплаты:", error);
    }
  };

  const clearCartFunc = () => {
    const formData = new FormData();
    formData.append("person_id", "17");
    formData.append("action", "clear");

    dispatch(clearCart(formData as ICartActions));
  };

  const confirmPayment = async (id: string) => {
    if (!id) {
      console.error("payment_id не установлен");
      return;
    }
    try {
      await axios.post(
        `https://restaurant--xrisent.repl.co/api/v1/payment/confirm_payment/`,
        {
          payment_intent_id: id,
        }
      );

      clearCartFunc();
      console.log("Оплата подтверждена успешно!");
    } catch (error) {
      console.log(error);
    }
  };

  const cancelPayment = async (id: string) => {
    if (!id) {
      console.error("payment_id не установлен");
      return;
    }
    try {
      await axios.post(
        `https://restaurant--xrisent.repl.co/api/v1/payment/cancel_payment/`,
        {
          payment_intent_id: id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.payment}>
      <div className="container">
        <div className={styles.payment__inner}>
          <h1>Страница Оплаты</h1>
          <div className={styles.payment_actinos}>
            <CInput type="text" defaultValue={total_price} disabled />
            <select
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              value={selectedPaymentMethod}
            >
              <option value="" key="">
                Выберите метод
              </option>
              <option value="VISA" key="VISA">
                VISA
              </option>
              <option value="MASTERCARD" key="MASTERCARD">
                MASTERCARD
              </option>
            </select>
          </div>
          <CButton onClick={pay}>Оплатить</CButton>
        </div>
      </div>
    </div>
  );
};
