import React from "react";
import { Link } from "react-router-dom";
import { FaCalendar } from "react-icons/fa"; // Make sure to install react-icons

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 fixed left-0 top-0">
      {/* Existing sidebar items... */}

      <Link
        to="/admin/calendar"
        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-700 transition-colors"
      >
        <FaCalendar className="text-xl" />
        <span>Calendar</span>
      </Link>

      {/* Other sidebar items... */}
    </div>
  );
};

export default Sidebar;
