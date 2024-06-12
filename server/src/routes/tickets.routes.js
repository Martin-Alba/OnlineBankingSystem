import express from 'express'
import TicketController from '../controllers/tickets.controller.js'

const router = express.Router()

router.get('/:id', TicketController.getTicketsById)

export default router
