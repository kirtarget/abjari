import { ReactNode } from "react";
import CatalogItem from "../../components/catalog/CatalogItem";
import { trpcClient } from "../../server/client";
import { GetServerSideProps, NextPage } from "next";
import { Item } from "../../lib/types/apiTypes";
import { sanClient } from "../../lib/sanityClient";
import { IProduct } from "../../lib/types/productType";

const Catalog: NextPage<{ products: IProduct[] }> = ({ products }) => {
  return (
    <div>
      {products?.map(
        (item: IProduct): JSX.Element => (
          <CatalogItem
            key={item._id}
            id={item._id}
            slug={item.slug.current}
            name={item.name}
            pricegel={item.pricegel}
            images={item.image}
            description={item.description}
            shortDescription={item.shortDescription}
          />
        )
      )}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const data = await trpcClient.items.query({ id: "all" });
//   return {
//     props: { data },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = '*[_type == "product"]';

  const products = await sanClient.fetch(query);

  return {
    props: { products },
  };
};

export default Catalog;
