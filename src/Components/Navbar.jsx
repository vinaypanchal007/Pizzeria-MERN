import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogged(true);
    }
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setLogged(false);
    navigate("/");
  };

  return (
    <div>
      <nav className="bg-red-600 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between p-4">
          <Link
            to="/"
            className="block py-2 pl-3 pr-4 text-2xl text-yellow-300 font-bold md:bg-transparent md:text-yellow-300 md:p-0 hover:text-yellow-400"
          >
            🍕 Pizza Mania
          </Link>
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-yellow-300 rounded-lg md:hidden hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-yellow-300 rounded-lg bg-yellow-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-red-600 rounded md:bg-transparent md:text-yellow-300 md:p-0 hover:text-yellow-500"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/MyOrders"
                  className="block py-2 pl-3 pr-4 text-red-600 rounded md:bg-transparent md:text-yellow-300 md:p-0 hover:text-yellow-500"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/About"
                  className="block py-2 pl-3 pr-4 text-red-600 rounded md:bg-transparent md:text-yellow-300 md:p-0 hover:text-yellow-500"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/Contact"
                  className="block py-2 pl-3 pr-4 text-red-600 rounded md:bg-transparent md:text-yellow-300 md:p-0 hover:text-yellow-500"
                >
                  Contact
                </Link>
              </li>
              <li>
                {logged ? (
                  <button
                    onClick={handleLogoutClick}
                    className="block py-2 pl-3 pr-4 text-red-600 rounded md:bg-transparent md:text-yellow-300 md:p-0 hover:text-yellow-500"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="block py-2 pl-3 pr-4 text-red-600 rounded md:bg-transparent md:text-yellow-300 md:p-0 hover:text-yellow-500"
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
