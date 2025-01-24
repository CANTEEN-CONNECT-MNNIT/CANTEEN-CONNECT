import { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const canteens = [
  'All Canteens',
  'Ojha Canteen',
  'Raj Canteen',
  'Tirath Canteen'
];

function CanteenFilter({ selectedCanteen, setSelectedCanteen }) {
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectCanteen = (canteen) => {
    setSelectedCanteen(canteen);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className={`inline-flex w-full justify-between items-center rounded-lg px-4 py-2 text-sm font-medium 
          ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'} 
          focus:outline-none focus:ring-2 focus:ring-orange-500`}
      >
        {selectedCanteen}
        <AiOutlineDown className="h-5 w-5 ml-2" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute left-0 mt-2 w-56 rounded-lg shadow-lg border border-gray-100 
          ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {canteens.map((canteen) => (
            <button
              key={canteen}
              onClick={() => selectCanteen(canteen)}
              className={`block w-full px-4 py-2 text-left text-sm 
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {canteen}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CanteenFilter;
