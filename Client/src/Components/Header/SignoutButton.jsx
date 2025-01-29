//Signout button on Canteen Route
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
const SignoutButton = ({onSignOut}) => {
  const darkMode=useSelector((state)=>state.theme.isDarkMode);
  return (
    <button
      onClick={onSignOut}
      className={`w-auto flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors duration-300 
        ${darkMode ? "bg-orange-800 hover:bg-red-500 text-white" : "bg-orange-200/80 hover:bg-gray-200 text-gray-800"} 
        shadow-md`}
    >
      <FaSignOutAlt className={`h-5 w-5 ${darkMode ? "text-white" : "text-gray-800"}`} />
      <span className="font-semibold text-lg">Sign Out</span>
    </button>
  );
};

export default SignoutButton;
