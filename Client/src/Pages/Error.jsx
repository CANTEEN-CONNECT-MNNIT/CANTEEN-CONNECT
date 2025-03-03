import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate=useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl mt-4">Page Not Found</h2>
      <p className="text-lg mt-2 text-gray-400">Sorry, the page you are looking for does not exist.</p>
      <button onClick={()=>navigate(-1)} className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all">Go Back</button>
    </div>
  );
}

export default Error;