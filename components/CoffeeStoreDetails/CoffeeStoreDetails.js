import React, { useEffect, useState } from "react";
import styles from "./CoffeeStoreDetails.module.css";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const CoffeeStoreDetails = ({ coffeeStoreDataDetails }) => {
  const { fsq_id } = coffeeStoreDataDetails;
  const [store, setStore] = useState({});
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/getCoffeeStoreById?id=${fsq_id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setStore(data.data);
    }
  }, [data]);

  if (isLoading || !coffeeStoreDataDetails) return <p>Loading....</p>;

  const handleUpvoteButton = async () => {
    try {
      const response = await fetch("/api/updateCoffeeStoreById", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: fsq_id,
        }),
      });

      const dbCoffeeStore = await response.json();
      setStore(dbCoffeeStore.data);
    } catch (err) {
      console.error("Error creating coffee store", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.backToHomeLink}>
          <Link scroll={false} href="/">
            ← Back to home
          </Link>
        </div>
        <div className={styles.nameWrapper}>
          <h1 className={styles.name}>{store?.name || "No Data Found"}</h1>
        </div>
        <Image
          src={store?.imgUrl}
          width={600}
          height={360}
          className={styles.storeImg}
          alt={store?.name}
        />
      </div>
      <div className={styles.col2 + " " + "glass"}>
        <div className={styles.iconWrapper}>
          <Image
            src="/static/icons/places.svg"
            width="24"
            height="24"
            alt="places icon"
          />
          <p className={styles.text}>
            {store?.location ? store.location : "No data found"}
          </p>
        </div>
        <div className={styles.iconWrapper}>
          <Image
            src="/static/icons/nearMe.svg"
            width="24"
            height="24"
            alt="near me icon"
          />
          <p className={styles.text}>
            {store?.region ? store.region : "No data found"}
          </p>
        </div>
        <div className={styles.iconWrapper}>
          <Image
            src="/static/icons/star.svg"
            width="24"
            height="24"
            alt="star icon"
          />
          <p className={styles.text}>{store?.voting}</p>
        </div>
        <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
          Up vote!
        </button>
      </div>
    </div>
  );
};

export default CoffeeStoreDetails;
