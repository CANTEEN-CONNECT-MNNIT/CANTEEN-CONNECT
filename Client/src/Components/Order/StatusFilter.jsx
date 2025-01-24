import { useSelector } from 'react-redux';

function StatusFilter({ activeFilter, setActiveFilter }) {
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const filters = ['All Orders', 'Pending', 'In Progress', 'Delivered'];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeFilter === filter
              ? 'bg-orange-500 text-white'
              : darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600' // Dark mode styling for non-active filters
              : 'bg-white text-gray-600 hover:bg-gray-50' // Light mode styling for non-active filters
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default StatusFilter;
