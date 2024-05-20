import express from 'express'
import OperationController from '../controllers/banking-operation.controller.js'

const router = express.Router()

router.get('/balance/:id', OperationController.getBalance)

router.post('/deposit', OperationController.depositMoney)

router.post('/withdraw', OperationController.withdrawMoney)

router.post('/transfer', OperationController.transferMoney)

export default router;