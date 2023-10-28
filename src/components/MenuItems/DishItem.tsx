// import React from "react";
// import styles from "./MenuItems.module.scss";
// import { BiCartAdd } from "react-icons/bi";
// import { IDishType } from "../../types/index.type";
// 
// interface IMenuProps {
//   item: IDishType;
//   onClick: (id: number, type: string) => void;
// }

// export const DishItem: React.FC<IMenuProps> = ({ item, onClick }) => {
//   const { name, photo, made_of, amount, price, id } = item;
  

//   return (
//     <div className={styles.item}>
//       <div className={styles.item__image}>
//         <img src={photo} alt={name} />
//       </div>
//       <div className={styles.item__title}>
//         <h3>{name}</h3>
//         <p>{made_of}</p>
//       </div>
//       <div className={styles.item__subtitle}>
//         <p>{amount}</p>
//         <div className={styles.item__actions}>
//           <p>{price} с</p>
//           <button onClick={() => onClick(id, "dishes")}>
//             <BiCartAdd />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
