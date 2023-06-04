import React from "react";
import styles from "./Main.module.css";
import Card from "../Card/Card";

const FetchCoffeeStore = ({ coffeeStores }) => {
  return (
    <>
      <h2 className={styles.heading2}>Near by Coffee Stores</h2>
      <div className={styles.cardLayout}>
        {coffeeStores.map((val) => (
          <Card
            key={val.fsq_id}
            href={`/coffee-store/${val.fsq_id}`}
            imgUrl={
              val.imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            name={val.name}
            className={styles.card}
          />
        ))}
      </div>
    </>
  );
};

export default FetchCoffeeStore;
