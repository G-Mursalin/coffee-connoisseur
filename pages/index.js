import Main from "@/components/Main/Main";
import { fetchData } from "@/lib/fetchData";

export default function Home({ coffeeStoreData }) {
  return (
    <>
      <Main coffeeStoreData={coffeeStoreData} />
    </>
  );
}

// Static Generation
export async function getStaticProps() {
  const data = await fetchData();

  return {
    props: {
      coffeeStoreData: data,
    },
  };
}
