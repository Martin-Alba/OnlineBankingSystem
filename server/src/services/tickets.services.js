import UserController from '../controllers/user.controller.js'
import { v4 as uuidv4 } from 'uuid'

export const createTicket = async (username, details) => {
  try {
    const user = await UserController.findUserByUsername(username)
    if (!user) return { success: false, message: 'User not found' }
    if (!details) return { success: false, message: 'Invalid details' }

    const ticket = {
      id: uuidv4(),
      ...details,
      date: new Date().toLocaleString()
    }

    user.tickets.push(ticket)

    await UserController.updateUser(user)

    return ticket
  } catch (err) {
    console.error(err)
    const msg = { message: 'Error creating ticket', error: err }
    return msg
  }
}

export const getTicketsById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await UserController.findUserById(id)
    if (!user) return res.status(404).send({ message: 'User not found' })

    console.log(user.tickets)
    return res.status(200).json(user.tickets)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Error getting tickets', error: err })
  }
}
