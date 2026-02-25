import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          Shop<span className="text-slate-900">Sphere</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/cart" className="relative hover:text-blue-600 transition">
  Cart
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
      {cartItems.length}
    </span>
  )}
</Link>
          {user ? (
  <button
    onClick={() => dispatch(logout())}
    className="hover:text-blue-600 transition"
  >
    Logout
  </button>
) : (
  <Link to="/login" className="hover:text-blue-600 transition">
    Login
  </Link>
)}

{user && (
  <span className="text-sm text-gray-500">
    {user.email}
  </span>
)}
        </div>

        {/* Mobile Placeholder */}
        <div className="md:hidden">
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;