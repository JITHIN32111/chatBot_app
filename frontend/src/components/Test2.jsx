// Sidebar.js

import React, { useState } from 'react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed h-screen bg-gray-800 text-white  w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        {/* Sidebar content */}
        <ul className="p-4">
          <li>
            <a href="#" className="hover:text-gray-300">
              Link 1
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Link 2
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Link 3
            </a>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>

      {/* Content */}
      <div className={`ml-0 md:ml-64 transition-transfor duration-300 ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}>
        {/* Add your main content here */}
        <h1 className="text-4xl font-bold mt-4">Main Content</h1>
        {/* Add more content as needed */}
      </div>

      {/* Button to toggle sidebar on small screens */}
      <div
        id="open-btn"
        className="block md:hidden fixed text-white text-2xl cursor-pointer top-4 left-4"
        onClick={toggleSidebar}
      >
        &#x02261;
      </div>
    </>
  );
};

export default Sidebar;
