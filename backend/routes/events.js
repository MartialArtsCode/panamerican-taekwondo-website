import express from 'express';
import { createEvent, updateEvent, deleteEvent, getEvents } from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
