import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const userFilePath = path.resolve(__dirname, '../../data/users.json')

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (err) {
    console.error(`Error hashPassword: ${err}`)
    throw new Error('Error hashing password')
  }
}

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (err) {
    console.error(`Error comparedPassword: ${err}`)
    throw new Error('Error comparing password')
  }
}

export const ensureUserFileExists = async () => {
  try {
    await fs.access(userFilePath)
    console.log('File users.json already exists')
  } catch (err) {
    try {
      await fs.mkdir(path.dirname(userFilePath), { recursive: true })
      await fs.writeFile(userFilePath, JSON.stringify([], null, 2), 'utf-8')
      console.log('File users.json created.')
    } catch (writeErr) {
      console.error(`Error creating users.json file: ${writeErr}`)
      throw new Error('Error creating users.json file')
    }
  }
}
