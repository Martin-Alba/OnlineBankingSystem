import {
  getUsers,
  saveUsers,
  findUserByUsername,
  findUserById,
  addUser,
  createUser,
  updateUser
} from '../services/user.service.js'

const UserController = {
  getUsers,
  saveUsers,
  findUserByUsername,
  findUserById,
  addUser,
  createUser,
  updateUser
}

export default UserController
