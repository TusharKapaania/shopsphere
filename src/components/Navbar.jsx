import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Shop<span className="text-slate-900">Sphere</span>
        </Link>

        {/* Desktop Menu */}
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
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-600"
          >
            Cart ({cartItems.length})
          </Link>

          {user ? (
            <button
              onClick={() => {
                dispatch(logout());
                setIsOpen(false);
              }}
              className="block text-left hover:text-blue-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block hover:text-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;