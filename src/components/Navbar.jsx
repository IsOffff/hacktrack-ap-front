import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-blue-600 p-4 shadow-xl">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center text-white">
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide text-white hover:text-gray-200 transition-all duration-300 ease-in-out"
        >
          HackTrack
        </Link>
        <div className="space-x-6 text-xl flex items-center">
          <Link to="/hackathons" className="hover:text-gray-200 transition duration-300">
            Hackathons
          </Link>

          {user && (
            <Link
              to="/hackathons/create"
              className="hover:text-gray-200 transition duration-300"
            >
              Nouveau Hackathon
            </Link>
          )}

          {user ? (
            <button onClick={handleLogout} className="hover:text-gray-200 transition duration-300">
              Logout
            </button>
          ) : (
            <>
              <Link to="/register" className="hover:text-gray-200 transition duration-300">
                Register
              </Link>
              <Link to="/login" className="hover:text-gray-200 transition duration-300">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
