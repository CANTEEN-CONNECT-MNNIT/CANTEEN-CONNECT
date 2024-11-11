import React, { useEffect, useState } from 'react';
import { FaCoffee } from 'react-icons/fa';

function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-orange-100 flex justify-center items-center">
      <div className="flex flex-col items-center p-8 max-w-md w-full bg-white rounded-lg shadow-lg">
        <FaCoffee className="w-16 h-16 text-orange-500 mb-6" />
        <h1 className="text-3xl font-bold text-orange-600 mb-4">Canteen Connect</h1>
        <p className="text-lg text-gray-800 mb-4">Setting up your dashboard, please wait...</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-orange-500 h-2.5 rounded-full"
            style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
