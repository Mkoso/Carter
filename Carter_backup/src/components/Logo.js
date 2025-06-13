import React from 'react';

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="w-8 h-8 bg-blue-600 rounded-lg transform rotate-45">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xl font-bold transform -rotate-45">C</span>
          </div>
        </div>
      </div>
      <span className="text-2xl font-bold text-white">Carter</span>
    </div>
  );
}

export default Logo; 