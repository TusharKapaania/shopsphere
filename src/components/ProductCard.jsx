import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-5 flex flex-col border border-gray-100 hover:-translate-y-1">
      
      <Link to={`/product/${product.id}`} className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-44 object-contain mb-4 group-hover:scale-105 transition duration-300"
        />
      </Link>

      <Link to={`/product/${product.id}`}>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-blue-600 transition min-h-10">
          {product.title}
        </h3>
      </Link>

      <p className="text-blue-600 font-bold text-lg mb-4">
        ${product.price}
      </p>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-auto bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;