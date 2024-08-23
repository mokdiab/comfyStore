import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { useState } from "react";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const totalProducts = meta.pagination.total;
  const [layout, setLayout] = useState(3);
  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`;
  };
  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalProducts} product{totalProducts > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          <button onClick={() => setLayout(4)} className={setActiveStyles(4)}>
            <TfiLayoutGrid4Alt />
          </button>
          <button onClick={() => setLayout(3)} className={setActiveStyles(3)}>
            <BsFillGrid3X3GapFill />
          </button>
          <button onClick={() => setLayout(1)} className={setActiveStyles(1)}>
            <BsList />
          </button>
        </div>
      </div>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout > 1 ? (
          <ProductsGrid cols={layout} />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};
export default ProductsContainer;
