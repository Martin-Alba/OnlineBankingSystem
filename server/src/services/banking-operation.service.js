import UserController from '../controllers/user.controller.js'
import TicketController from '../controllers/tickets.controller.js'

export const depositMoney = async (req, res) => {
  const { username, amount } = req.body

  try {
    const user = await UserController.findUserByUsername(username)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    if (!amount) return res.status(404).json({ success: false, message: 'Invalid amount' })

    const depositAmount = parseFloat(amount)
    user.balance += depositAmount
    await UserController.updateUser(user)

    const ticketDetails = { operation: 'Deposit', username, amount: depositAmount }
    await TicketController.createTicket(username, ticketDetails)

    return res.status(200).json({ success: true, message: 'Money deposited successfully' })
  } catch (err) {
    console.error(`Error depositMoney: ${err}`)
    return res.status(500).json({ message: 'Error depositing money' })
  }
}

export const withdrawMoney = async (req, res) => {
  const { username, amount } = req.body

  try {
    const user = await UserController.findUserByUsername(username)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })

    if (user.balance < amount) return res.status(400).json({ success: false, message: 'Insufficient balance' })

    const withdrawAmount = parseFloat(amount)
    user.balance -= withdrawAmount
    await UserController.updateUser(user)

    const ticketDetails = { operation: 'Withdraw', username, withdrawAmount }
    await TicketController.createTicket(username, ticketDetails)

    return res.status(200).json({ success: true, message: 'Money withdrawn successfully' })
  } catch (err) {
    console.error(`Error withdrawMoney: ${err}`)
    return res.status(500).json({ message: 'Error withdrawing money' })
  }
}

export const getBalance = async (req, res) => {
  const { id } = req.params

  console.log(`Requested balance for id: ${id}`)
  try {
    const user = await UserController.findUserById(id)
    console.log(`User retrieved: ${JSON.stringify(id)}`)

    if (!user) return res.status(404).json({ success: false, message: 'User not found' })

    console.log(`User balance: ${user.balance}`)
    return res.status(200).json({ success: true, balance: user.balance })
  } catch (err) {
    console.error(`Error getBalance: ${err}`)
    return res.status(500).json({ message: 'Error getting balance' })
  }
}

export const transferMoney = async (req, res) => {
  const { fromUsername, toUsername, amount } = req.body
  console.log(`fromUsername: ${fromUsername}, toUsername: ${toUsername}, amount ${amount}`)
  try {
    const fromUser = await UserController.findUserByUsername(fromUsername)
    console.log(`from: ${fromUser.username}`)

    const toUser = await UserController.findUserByUsername(toUsername)
    console.log(`to: ${toUser.username}`)

    if (!fromUser) return res.status(404).json({ success: false, message: 'From user not found' })
    if (!toUser) return res.status(404).json({ success: false, message: 'To user not found' })
    if (fromUser.balance < amount) return res.status(400).json({ success: false, message: 'Insufficient balance' })

    const transferAmount = parseFloat(amount)

    fromUser.balance -= transferAmount
    toUser.balance += transferAmount

    await UserController.updateUser(fromUser)

    const ticketDetails = { operation: 'Transfer', fromUsername, toUsername, amount: transferAmount }
    const ticket = await TicketController.createTicket(fromUsername, ticketDetails)

    if (ticket) {
      toUser.tickets.push(ticket)
      await UserController.updateUser(toUser)
    }

    return res.status(200).json({ success: true, message: 'Money transferred successfully' })
  } catch (err) {
    console.error(`Error transferMoney: ${err}`)
    return res.status(500).json({ message: 'Error transferring money' })
  }
}
