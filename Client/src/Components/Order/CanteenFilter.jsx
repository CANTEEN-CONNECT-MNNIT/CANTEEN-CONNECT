import { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import canteenService from '../../ApiService/canteenService';


function CanteenFilter({ selectedCanteen, setSelectedCanteen }) {
  const [canteens,setCanteens]=useState([]);
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectCanteen = (canteen) => {
    setSelectedCanteen(canteen);
    setIsOpen(false);
  };

  console.log(canteens);
  

  const fetchCanteens=async()=>{
    try {
      const res=await canteenService.getCanteen();
      if(res){
        setCanteens(res?.data);
      }
    } catch (error) {
      console.error(error?.response?.data?.message);
      
    }
  }

  useEffect(()=>{
    fetchCanteens();
  },[]);

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
            <button
              key={"AllCanteens"}
              onClick={() => selectCanteen('All Canteens')}
              className={`block w-full px-4 py-2 text-left text-sm 
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              All Canteens
            </button>
          {canteens && canteens?.length>0 && canteens?.map((canteen) => (
            <button
              key={canteen._id}
              onClick={() => selectCanteen(canteen?.name)}
              className={`block w-full px-4 py-2 text-left text-sm 
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {canteen?.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CanteenFilter;
