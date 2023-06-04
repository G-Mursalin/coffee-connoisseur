import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/coffee-store.module.css";
import Head from "next/head";
import CoffeeStoreDetails from "@/components/CoffeeStoreDetails/CoffeeStoreDetails";
import { fetchData } from "@/lib/fetchData";
import { StoreContext } from "@/context/storeContext";

const CoffeeStore = ({ coffeeStoreDataDetails }) => {
  if (!coffeeStoreDataDetails) {
    return <div>Loading...</div>;
  }

  const router = useRouter();
  const { id } = router.query;
  const { coffeeStores, setCoffeeStores } = useContext(StoreContext);
  const [data, setData] = useState({});

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: coffeeStore.fsq_id,
          name: coffeeStore.name,
          voting: 0,
          imgUrl: coffeeStore.imgUrl,
          location: coffeeStore.location ? coffeeStore.location.address : "",
          region: coffeeStore.location ? coffeeStore.location.region : "",
        }),
      });

      const dbCoffeeStore = await response.json();
    } catch (err) {
      console.error("Error creating coffee store", err);
    }
  };

  useEffect(() => {
    if (Object.keys(coffeeStoreDataDetails).length === 0) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find(
          (coffeeStore) => coffeeStore.fsq_id === id
        );

        handleCreateCoffeeStore(findCoffeeStoreById);
        setData(findCoffeeStoreById);
      }
    } else {
      handleCreateCoffeeStore(coffeeStoreDataDetails);
      setData(coffeeStoreDataDetails);
    }
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{data?.name}</title>
        <meta name="description" content={`${data?.name} coffee store`} />
      </Head>
      <CoffeeStoreDetails coffeeStoreDataDetails={data} />
    </div>
  );
};

// Static Generation
export const getStaticProps = async ({ params }) => {
  const data = await fetchData();

  const findCoffeeStoreById = data.find((val) => val.fsq_id == params.id);

  return {
    props: {
      coffeeStoreDataDetails: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
};

// Provide paths
export async function getStaticPaths() {
  const data = await fetchData();

  const paths = data.map((val) => ({
    params: { id: String(val.id) },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default CoffeeStore;
