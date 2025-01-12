import React, { useEffect, useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import { FaExternalLinkAlt } from "react-icons/fa";

const API_URL = "http://localhost:5000/api";

const EmployeeCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (ApiCalendar.sign) {
      listUpcomingEvents();
    }
  }, [ApiCalendar.sign]);

  const handleItemClick = (event, name) => {
    if (name === "sign-in") {
      ApiCalendar.handleAuthClick();
    } else if (name === "sign-out") {
      ApiCalendar.handleSignoutClick();
    }
  };

  const openGoogleCalendar = () => {
    window.open("https://calendar.google.com", "_blank");
  };

  const listUpcomingEvents = () => {
    ApiCalendar.listUpcomingEvents(10)
      .then(({ result }) => {
        setEvents(result.items);
      })
      .catch((error) => {
        console.error("Error fetching events", error);
      });
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/calendar/events`);
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="p-6 ml-64">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Calendar</h1>
          <button
            onClick={openGoogleCalendar}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Open Google Calendar <FaExternalLinkAlt className="text-sm" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={(e) => handleItemClick(e, "sign-in")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In with Google
          </button>
          <button
            onClick={(e) => handleItemClick(e, "sign-out")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            {events.length === 0 ? (
              <p className="text-gray-500">No upcoming events</p>
            ) : (
              <ul className="space-y-3">
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="bg-white p-4 rounded shadow-sm border border-gray-200"
                  >
                    <h3 className="font-medium">{event.summary}</h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(event.start.dateTime).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCalendar;
