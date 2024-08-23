import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "../../features/cart/cartSlice";
import { useEffect } from "react";
import { formatPrice } from "../../utils/index";
const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [orderTotal, dispatch]);
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <p className="flex justify-between text-xs border-base-300 border-b pb-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>
        <p className="flex justify-between text-xs border-base-300 border-b pb-2">
          <span>Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>
        <p className="flex justify-between text-xs border-base-300 border-b pb-2">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>
        <p className="flex justify-between mt-4 text-sm font-semibold">
          <span>Order Total</span>
          <span>${formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
