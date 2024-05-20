import express from 'express'
import AuthController from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', AuthController.Register)

router.post('/login', AuthController.Login)

export default router