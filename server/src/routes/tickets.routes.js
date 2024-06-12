import express from 'express'
import TicketController from '../controllers/tickets.controller.js'
import { ticketBelongsToUser } from '../middleware/tickets-security.middleware.js'

const router = express.Router()

router.get('/:id', ticketBelongsToUser, TicketController.getTicketsById)

export default router
