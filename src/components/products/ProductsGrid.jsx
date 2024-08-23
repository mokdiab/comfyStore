import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";
const ProductsGrid = ({ cols = 3 }) => {
  const { products } = useLoaderData();
  return (
    <div
      className={`pt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${cols}`}
    >
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};
export default ProductsGrid;
