import axios from "axios";

const productionUrl = " https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
  const dollarAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "egp",
  }).format((price / 100).toFixed(2));

  return dollarAmount;
};
export const generateRange = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
