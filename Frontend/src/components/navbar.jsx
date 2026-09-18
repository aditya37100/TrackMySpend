import { useState } from "react";
import ThemeToggle from './Themetoggle';
import logo from '../assets/budgeting.gif';
export default function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
<nav className="bg-customLightGray dark:bg-[#20252e] border rounded border-[#091319] text-customIndigoDark dark:text-custom1Blue px-4 py-3 shadow-md">
<div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <img src={logo} className="w-14 " alt="Logo" />
          <span className="text-2xl font-bold whitespace-nowrap dark:text-white">
            TrackMySpend
          </span>
        </div>
        <div className="flex items-center gap-6">
        <ThemeToggle/>           

        {/* Avatar & Toggle */}
        <div className="flex items-center space-x-4">
          {/* Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none"
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="User avatar"
              />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-customBlack border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                <div className="px-4 py-2">
                  <p className="text-lg">Tanmay</p>
                  <p className="text-md font-segoe truncate text-gray-500 dark:text-gray-300">
                    you@example.com
                  </p>
                </div>
                <ul className="py-1">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</a>
                  </li>
                  
                  <li>
                    <hr className="my-1 border-gray-200 dark:border-gray-600" />
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">Sign out</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        </div>
      </div>

      {/* Collapsible menu */}
      
    </nav>
  );
}
