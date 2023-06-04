import React, { useContext, useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import Image from "next/image";
import Card from "../Card/Card";
import styles from "./Main.module.css";
import Head from "next/head";
import useLocation from "@/Hook/useLocation";
import { StoreContext } from "@/context/storeContext";
import InitialCoffeeStore from "./InitialCoffeeStore";
import FetchCoffeeStore from "./FetchCoffeeStore";

const Main = ({ coffeeStoreData }) => {
  const { locationError, latLong, handleLocation, loading } = useLocation();
  const { coffeeStores, setCoffeeStores } = useContext(StoreContext);
  const [coffeeStoreError, setCoffeeStoreError] = useState("");

  const handleBannerButton = () => {
    handleLocation();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/getCoffeeStores?limit=50");
        const { data } = await response.json();
        const nearByStore = data.slice(6);
        setCoffeeStores(nearByStore);
      } catch (error) {
        setCoffeeStoreError(error.message);
      }
    };

    if (latLong) {
      getData();
    }
  }, [latLong]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:title"
          content="A coffee connoisseur is someone who knows everything about the drink. You know the different roasts. You know the different types of beans (and where they come from)."
          key="title"
        />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={loading ? "Locating..." : "View store nearby"}
          onHandleClick={handleBannerButton}
        />
        {locationError ? locationError : latLong}
        {coffeeStoreError ? coffeeStoreError : coffeeStoreError}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="banner image"
          />
        </div>

        {/* Coffee Stores after clicking the button */}
        {!(coffeeStores.length === 0) && (
          <FetchCoffeeStore coffeeStores={coffeeStores} />
        )}

        {/* Initial Coffee Stores */}
        {!(coffeeStoreData.length === 0) && (
          <InitialCoffeeStore coffeeStoreData={coffeeStoreData} />
        )}
      </main>
    </div>
  );
};

export default Main;
