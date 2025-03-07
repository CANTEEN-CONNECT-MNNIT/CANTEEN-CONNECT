import { useSelector } from 'react-redux';

function StatusFilter({ activeFilter, setActiveFilter }) {
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const filters = [
    {name:'All Orders', status:'All Orders'},
    {name:'Pending',status:'Pending',},
    {name:'In Progress',status:'Preparing',},
    {name:'Ready',status:'Ready for pickup',},
    {name:'Delivered',status:'Delivered',},
    {name:'Completed',status:'Success',},
  ]

  return (
    <div className="flex flex-wrap gap-2">
      <select name="filter" id="filter" defaultValue={activeFilter}
      onChange={(e)=>setActiveFilter(e.target.value)} className={`px-4 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white`}>

      {filters.map((filter) => (
        <option
        key={filter.status}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === filter.status
          ? 'bg-orange-500 text-white'
          : darkMode
          ? 'bg-gray-700 text-white hover:bg-gray-600' // Dark mode styling for non-active filters
          : 'bg-white text-gray-600 hover:bg-gray-50' // Light mode styling for non-active filters
        }`}
        value={filter?.status}
        >
          {filter.name}
        </option>
      ))}
      </select>
    </div>
  );
}

export default StatusFilter;
