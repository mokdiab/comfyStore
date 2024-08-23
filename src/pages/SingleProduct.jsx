import { useLoaderData } from "react-router-dom";
import { customFetch, formatPrice } from "../utils/index";
import { Breadcrumb, SelectNumbers } from "../components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
const singleProductQuery = (id) => ({
  queryKey: ["singleProduct", id],
  queryFn: () => customFetch(`/products/${id}`),
});
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    const response = await queryClient.ensureQueryData(singleProductQuery(id));
    const product = response.data.data;
    return { id, product };
  };
const SingleProduct = () => {
  const { product } = useLoaderData();
  const { title, description, company, price, image, colors } =
    product.attributes;
  const dollarsAmount = formatPrice(price);
  const [amount, setAmount] = useState(1);
  const [productColor, setproductColor] = useState(colors[0]);
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };
  const dispatch = useDispatch();
  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };
  const handleAddingToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <Breadcrumb />
      <div className="mt-6 grid lg:grid-cols-2 gap-y-8 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        <div className="">
          <h1 className="text-3xl font-bold capitalize">{title}</h1>
          <h2 className="text-xl mt-2 text-neutral-content font-bold capitalize">
            {company}
          </h2>
          <h3 className="text-xl mt-3">{dollarsAmount}</h3>
          <p className="mt-4 leading-8">{description}</p>
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  className={`badge w-6 h-6 mr-2 ${
                    color === productColor ? "border-2 border-secondary" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setproductColor(color)}
                ></button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <SelectNumbers
              start={1}
              end={20}
              onChange={handleAmount}
              value={amount}
            />
          </div>
          <div className="mt-10 ">
            <button
              className="btn btn-secondary btn-md uppercase"
              onClick={() => handleAddingToCart()}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
