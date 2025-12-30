import Event from '../models/Event.js';
import { io } from '../server.js';

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    io.emit('eventCreated', event);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    io.emit('eventUpdated', event);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    io.emit('eventDeleted', req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
