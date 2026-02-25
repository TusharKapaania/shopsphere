import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 bg-white p-10 rounded-3xl shadow-sm ">

      {/* Image */}
      <div className="h-96 object-contain flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 object-contain"
        />
      </div>

      {/* Info */}
      <div>
        <h1 className="text-3xl font-bold mb-4">
          {product.title}
        </h1>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <p className="text-2xl font-bold text-blue-600 mb-6">
          ${product.price}
        </p>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;