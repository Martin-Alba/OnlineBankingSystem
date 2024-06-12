import jwt from 'jsonwebtoken'
import UserController from '../controllers/user.controller.js'
import { comparePassword } from '../utils/utils.js'
import cookieParser from 'cookie-parser'

export const Register = async (req, res) => {
  const { username, password } = req.body
  try {
    const existingUser = await UserController.findUserByUsername(username)
    if (existingUser) return res.status(400).json({ message: `User: ${username} already exist` })

    const payload = await UserController.createUser(username, password)
    res.status(201).json(payload)
  } catch (err) {
    console.error(`Error /register: ${err}`)
    res.status(500).json({ message: 'Error registering user' })
  }
}

export const Login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserController.findUserByUsername(username)
    if (!user) return res.status(404).json({ message: `User: ${username} not found` })

    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({ message: 'Account is locked. Try again later.' })
    }

    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      user.failedLoginAttempts += 1

      if (user.failedLoginAttempts >= 3) {
        user.lockUntil = Date.now() + 15 * 60 * 1000
        user.failedLoginAttempts = 0
      }

      await UserController.updateUser(user)
      return res.status(400).json({ message: 'Invalid password' })
    }

    user.failedLoginAttempts = 0
    user.lockUntil = null

    await UserController.updateUser(user)
    res.cookie('sessionId', `${user.id}`, { maxAge: 900000, secure: true, httpOnly: true })
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ success: true, message: 'Login success', id: user.id, token })
  } catch (err) {
    console.error(`Error /login: ${err}`)
    res.status(500).json({ message: 'Error logging in' })
  }
}
