import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto">
  <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

  {cartItems.length === 0 ? (
    <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
      <p className="text-gray-500 text-lg">
        Your cart is empty.
      </p>
    </div>
  ) : (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-lg">
              {item.title}
            </h3>
            <p className="text-blue-600 font-bold mt-2">
              ${item.price}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>

              <span className="px-4">{item.quantity}</span>

              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right text-2xl font-bold mt-8">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  )}
</div>
  );
};

export default Cart;