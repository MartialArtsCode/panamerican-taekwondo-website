import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import { useNotification } from "../context/NotificationContext";

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const { showNotification } = useNotification();

  useEffect(() => {
    // Initial fetch (replace with your API endpoint)
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setEvents([]);
      }
    }
    fetchEvents();

    // Socket listeners
    socket.on("eventCreated", (event) => {
      setEvents((prev) => [...prev, event]);
      showNotification("New event added!", "info");
    });
    socket.on("eventUpdated", (event) => {
      setEvents((prev) => prev.map(e => e._id === event._id ? event : e));
      showNotification("Event updated!", "info");
    });
    socket.on("eventDeleted", (eventId) => {
      setEvents((prev) => prev.filter(e => e._id !== eventId));
      showNotification("Event deleted!", "info");
    });

    return () => {
      socket.off("eventCreated");
      socket.off("eventUpdated");
      socket.off("eventDeleted");
    };
  }, [showNotification]);

  return (
    <div>
      <h2>Events Calendar</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <strong>{event.title}</strong> - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsCalendar;
