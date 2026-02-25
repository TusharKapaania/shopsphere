import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import { useState } from "react";


const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const filteredProducts = items.filter((product) => {
  const matchesSearch = product.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    category === "all" || product.category === category;

  return matchesSearch && matchesCategory;
});

  const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 8;

  useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, category]);

const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

const currentProducts = filteredProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);

const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
    
    <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
  Filter & Search
</h3>

    <div className="flex flex-col md:flex-row gap-6 items-center">
    
    {/* Search */}
    <div className="w-full md:flex-1 relative">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    {/* Category Select */}
    <div className="w-full md:w-64 relative">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer"
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>

      {/* Custom Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
        ▼
      </div>
    </div>
  </div>
</div>

      {/* Hero */}
      <section className="bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-12 mb-14 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Discover Premium Products
        </h1>
        <p className="text-lg md:text-xl mb-8 text-blue-100">
            Shop smarter. Live better. All in one sphere.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
            Explore Collection
        </button>
      </section>

      <h2 className="text-2xl font-bold mb-6">
        Featured Products
      </h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
  <div className="flex justify-center mt-10 gap-2 flex-wrap">
    
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50"
    >
      Previous
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-4 py-2 rounded-lg border ${
          currentPage === index + 1
            ? "bg-blue-600 text-white"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      onClick={() =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
      }
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50"
    >
      Next
    </button>

  </div>
)}
    </div>
  );
};

export default Home;